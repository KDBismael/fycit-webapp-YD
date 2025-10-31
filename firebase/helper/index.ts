
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase_client_config";

type COLLECTIONS = "users" | "guilds" | "locales" | "guildVerifications" | "notifications" | "screenings" | "venues" | "events" | "projects" | "fycitNews";

export const readDataFromDb = async <T>(collectionName: COLLECTIONS) => {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const serializedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return serializedData as T[];
};
export const uploadUserProfilePhoto = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `profilePhotos/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
};

