import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase_client_config";

export const readDataFromDb = async (collectionName: string) => {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const serializedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return serializedData;
};