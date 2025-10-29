import { auth } from '@/firebase/firebase_client_config';
import { getGuildVerificationRequests } from '@/firebase/verifications';
import { GuildVerificationsType } from '@/types/collections';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type AuthContext = 'signup' | 'password-reset' | 'login' | null;

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

  // guild verification data
  userVerificationGuilds: GuildVerificationsType[];

  // Actions
  setSignupData: (data: SignupData) => void;
  setAuthContext: (context: AuthContext, email?: string) => void;
  setEmailVerified: (verified: boolean) => void;
  setOtpCode: (code: string) => void;
  setIsLoading: (loading: boolean) => void;
  setUserVerificationGuilds: (data: GuildVerificationsType[]) => void;
  fetchUserVerificationGuilds: () => Promise<void>;
  resetAuthStore: () => void;
}

const initialState = {
  isLoading: false,
  signupData: null,
  authContext: null as AuthContext,
  verificationEmail: null,
  isEmailVerified: false,
  otpCode: '',
  userVerificationGuilds: [],
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUserVerificationGuilds: (data) => {
        set({ userVerificationGuilds: data });
      },

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
        set((state) => ({ ...initialState, userVerificationGuilds: state.userVerificationGuilds }));
      },

      fetchUserVerificationGuilds: async () => {
        try {
          const data = await getGuildVerificationRequests(auth.currentUser?.uid ?? '')
          set({ userVerificationGuilds: data });
        } catch (error) {
          console.error("Error fetching userVerificationGuilds", error);
          set({ userVerificationGuilds: [] });
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

