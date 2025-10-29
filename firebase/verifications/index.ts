import { GuildVerificationsType, UsersType } from "@/types/collections";
import {
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
    where,
} from "firebase/firestore";
import {
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";
import { db, storage } from "../firebase_client_config";

/**
 * Fetches all guild verification requests for a given user,
 * excluding those with tags "rejected" or "canceled".
 */
export async function getGuildVerificationRequests(
    userId: string
): Promise<GuildVerificationsType[]> {

    const q = query(
        collection(db, "guildVerificationRequest"),
        where("userId", "==", userId),
        where("tag", "not-in", ["rejected", "canceled"])
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }) as GuildVerificationsType);
}

/** Helpers */
function fileNameParts(name: string) {
    const lastDot = name.lastIndexOf(".");
    const hasExt = lastDot !== -1 && lastDot !== 0;
    const ext = hasExt ? name.slice(lastDot) : "";
    const base = hasExt ? name.slice(0, lastDot) : name;
    return { base, ext };
}

function makeUniqueName(originalName: string) {
    const { base, ext } = fileNameParts(originalName);
    const stamp = Date.now();
    return `${base}_${stamp}${ext}`;
}

/**
 * Upload a guild proof file to Firebase Storage and return its download URL.
 * `file` can be a File (browser) or Blob (fallback).
 */
export async function uploadGuildProofOfMembership(
    file: File | Blob & { name?: string }
): Promise<string> {
    const originalName = (file as File).name ?? "proof";
    const uniqueName = makeUniqueName(originalName);

    const objectRef = ref(storage, `guildProofOfMembership/${uniqueName}`);
    await uploadBytes(objectRef, file);
    return await getDownloadURL(objectRef);
}

/**
 * Create a guild verification request. If `id` is omitted, a new doc id is generated.
 * Adds the `id` field to the stored document (like your Dart version).
 */
export async function createGuildVerificationRequest(
    data: Record<string, any>,
    id?: string
): Promise<string> {
    const colRef = collection(db, "guildVerificationRequest");
    const docRef = id ? doc(colRef, id) : doc(colRef); // generate if not provided
    const docId = id ?? docRef.id;

    await setDoc(docRef, { ...data, id: docId });
    return docId;
}

/**
 * Update the `tag` (status) of a guild verification request (merge = true).
 */
export async function changeGuildVerificationStatus(
    guildVerificationId: string,
    status: string
): Promise<void> {
    const docRef = doc(db, "guildVerificationRequest", guildVerificationId);
    await setDoc(docRef, { tag: status }, { merge: true });
}

function isPlainObject(v: unknown): v is Record<string, any> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Recursively walks a data object:
 * - File/Blob  -> upload to Storage, replace with URL
 * - Date       -> Firestore Timestamp
 * - Arrays     -> process each element
 * - Objects    -> process fields recursively
 * - classic types -> same
 */
export async function prepareVerificationData(
    fieldValues: Record<string, any>
): Promise<Record<string, any>> {
    const out: Record<string, any> = {};

    for (const [key, value] of Object.entries(fieldValues)) {
        if (value instanceof File || value instanceof Blob) {
            // upload file, keep URL
            const url = await uploadGuildProofOfMembership(value);
            out[key] = url;
        } else if (value instanceof Date) {
            out[key] = Timestamp.fromDate(value);
        } else if (Array.isArray(value)) {
            out[key] = await Promise.all(
                value.map(async (item) => {
                    if (item instanceof File || item instanceof Blob) {
                        return uploadGuildProofOfMembership(item);
                    } else if (item instanceof Date) {
                        return Timestamp.fromDate(item);
                    } else if (isPlainObject(item)) {
                        return prepareVerificationData(item);
                    }
                    return item;
                })
            );
        } else if (isPlainObject(value)) {
            out[key] = await prepareVerificationData(value);
        } else {
            out[key] = value;
        }
    }

    return out;
}

/**
 * sendGuildVerificationRequestNew
 * - collects user info
 * - prepares payload (uploads files, converts dates)
 * - writes document (with optional provided id)
 * - returns a user-friendly message
 */
export async function sendGuildVerificationRequestNew(
    guilds: string[],
    fieldValues: Record<string, any>,
    user: UsersType,
    id?: string
): Promise<string> {
    try {
        const userId = user.id;

        const processed = await prepareVerificationData(fieldValues);

        const data = {
            ...processed,
            guilds,
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            verificationDate: serverTimestamp(),
            tag: "pending",
        };

        await createGuildVerificationRequest(data, id);
        // console.log(data);
        return "Request successfully sent";
    } catch (e) {
        // console.error("Error sending verification request:", e);
        return "Error sending your verification request, try again later";
    }
}