import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AuthContext = 'signup' | 'password-reset' | null;

interface AuthStore {
  isLoading: boolean;
  // User data
  signupData: SignupData | null;

  // Context tracking
  authContext: AuthContext;
  verificationEmail: string | null;

  // Verification state
  isEmailVerified: boolean;
  otpCode: string;

  // Actions
  setSignupData: (data: SignupData) => void;
  setAuthContext: (context: AuthContext, email?: string) => void;
  setEmailVerified: (verified: boolean) => void;
  setOtpCode: (code: string) => void;
  setIsLoading: (loading: boolean) => void;
  resetAuthStore: () => void;
}

const initialState = {
  isLoading: false,
  signupData: null,
  authContext: null as AuthContext,
  verificationEmail: null,
  isEmailVerified: false,
  otpCode: '',
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setSignupData: (data: SignupData) => {
        set({ signupData: data });
      },

      setAuthContext: (context: AuthContext, email?: string) => {
        set({
          authContext: context,
          verificationEmail: email || null,
        });
      },

      setEmailVerified: (verified: boolean) => {
        set({ isEmailVerified: verified });
      },

      setOtpCode: (code: string) => {
        set({ otpCode: code });
      },

      setIsLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      resetAuthStore: () => {
        set(initialState);
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

