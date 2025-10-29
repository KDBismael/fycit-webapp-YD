import { UsersType } from "@/types/collections";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
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

export const updateUserInfo = async (data: Partial<UsersType>) => {
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


/**
 * Creates user data in Firestore based on registration form values.
 */
export async function createUserData(data: Partial<UsersType>): Promise<Partial<UsersType> | undefined> {
    const userId = auth.currentUser?.uid ?? null;

    try {
        if (!userId) {
            alert(
                "Error: Could not find user profile information. Please try exiting the app and completing registration again."
            )
            return;
        }

        if (!data.firstName || !data.lastName || !data.email) {
            alert("Error: Please fill out all fields and try again.")
            return;
        }

        const userInfoJson = {
            firstName: data.firstName,
            lastName: data.lastName,
            guild: data.guild ?? [],
            zipCode: data.zipCode ?? '',
            dataGroup: 'production',
            userSettings: {
                EMAIL_ABOUT_FEATURES: false,
                newEventAdded: true,
                newContentAdded: true,
                eventAddedForFavoritedProject: true,
                contentAddedForFavoritedProject: true,
                eventAddedAtFavoritedVenue: true,
                CapacityChangedToOpen: true,
                occasionalImportantUpdates: true,
                automaticallyViewNewLocales: false,
            },
            country: data.country ?? '',
            locale: data.locale ?? [],
            email: data.email,
            lastNotification: Timestamp.now(),
            firstLogin: Timestamp.now(),
            lastLogin: Timestamp.now(),
        };

        const userInfoJsonWithAdditional = {
            ...userInfoJson,
            areYouMoreLikely: "",
            movieTypes: [],
            virtualFocusGroup: '',
        };

        console.log("Creating user with data:", userInfoJsonWithAdditional);

        // Create user data in Firestore
        const docRef = doc(db, "users", userId);
        await setDoc(docRef, userInfoJsonWithAdditional, { merge: true });

        return { id: userId, ...userInfoJsonWithAdditional } as Partial<UsersType>;
        // Update local app state
        // Auth.setUserInfo(userInfoJsonWithAdditional as UserInfo);

        // filteringdata.dispatch(FilterActions.resetFilters());
        // filmDetailFilteringdata.dispatch(FilterActions.resetFilters());
        // Analytics.logSignUp();

    } catch (error) {
        console.error("Error creating user data:", error);
        alert("Error: An unexpected error occurred.")
    }
}