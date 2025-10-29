import { httpsCallable } from "firebase/functions";
import { cloudFunctions } from "../firebase_client_config";

const sentOtp = httpsCallable(cloudFunctions, 'sendOtpEmail');

export const sendOtpEmail = async (email: string) => {
    try {
        const response = await sentOtp({ email });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error };
    }
}

const verifyOtp = httpsCallable(cloudFunctions, 'verifyOtp');

export const verifyOtpEmail = async (email: string, otp: string) => {
    try {
        const response = await verifyOtp({ email, otp });
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error };
    }

}