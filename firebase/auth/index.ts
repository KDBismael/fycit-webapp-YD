import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail as fbSendPasswordResetEmail,
    User as FirebaseUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { auth } from "../firebase_client_config";

type AuthError = { code: string; message: string };
type AuthResult = { user?: FirebaseUser | null; error?: AuthError };
type SimpleResult = { success: boolean; error?: AuthError };

// Create a new user with email/password
export async function signUpWithEmailPassword(
    email: string,
    password: string,
): Promise<AuthResult> {
    try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        return { user: cred.user };
    } catch (err: any) {
        return {
            error: {
                code: err?.code ?? "auth/error",
                message: err?.message ?? String(err),
            },
        };
    }
}

// Sign in existing user
export async function signInWithEmailPassword(
    email: string,
    password: string
): Promise<AuthResult> {
    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        return { user: cred.user };
    } catch (err: any) {
        return {
            error: {
                code: err?.code ?? "auth/error",
                message: err?.message ?? String(err),
            },
        };
    }
}

// Sign out current user
export async function signOutUser(): Promise<SimpleResult> {
    try {
        await signOut(auth);
        return { success: true };
    } catch (err: any) {
        return { success: false, error: { code: err?.code ?? "auth/error", message: err?.message ?? String(err) } };
    }
}

// Send password reset email
export async function sendPasswordReset(email: string): Promise<SimpleResult> {
    try {
        await fbSendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (err: any) {
        return { success: false, error: { code: err?.code ?? "auth/error", message: err?.message ?? String(err) } };
    }
}

// Subscribe to auth state changes. Returns unsubscribe function.
export function onAuthStateChangedListener(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
}
