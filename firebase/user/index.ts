import { UsersType } from "@/types/collections";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase_client_config";

export async function getUserById(userId: string): Promise<UsersType | null> {
    const userRef = doc(db, 'users', userId)
    try {
        const snapshot = await getDoc(userRef)

        if (snapshot.exists()) {
            return {
                id: snapshot.id,
                ...snapshot.data(),
            } as UsersType
        }

        return null
    } catch (error) {
        console.error("Error fetching user:", error)
        return null
    }

}

export const updateUserInfo = async (data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    guild?: string[];
    locale?: string;
    zipCode?: string;
}) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User not authenticated");
    }

    const userRef = doc(db, "users", user.uid);

    try {
        await setDoc(userRef, data, { merge: true });
    } catch (error) {
        console.error("❌ Failed to update user info:", error);
        throw error;
    }
};