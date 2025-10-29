
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase_client_config";

type COLLECTIONS = "users" | "guilds" | "locales" | "guildVerifications" | "notifications" | "screenings" | "venues" | "events" | "projects";

export const readDataFromDb = async <T>(collectionName: COLLECTIONS) => {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const serializedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return serializedData as T[];
};


type Navigate = (path: string) => void;

/**
 * Decides where to go after guilds are set and verifications are known.
 * @param navigate your router navigate (e.g. useNavigate())
 * @param allGuilds list of all known guilds
 * @param userGuilds the user's selected guild names (longName)
 * @param selectedGuilds the current multi-select set (used for the "Other Org..." shortcut)
 * @param guildVerifications user's verification records
 * @param is2FAComplete kept for parity with original (not used in current logic)
 */

