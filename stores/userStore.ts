import { auth } from '@/firebase/firebase_client_config';
import { getUserById } from '@/firebase/user';
import { UsersType } from '@/types/collections';
import { UserStore } from '@/types/store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const initialState = {
  user: null,
  isAwards26Viewed: false,
  userGuilds: [],
  autoViewNewLocales: false,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,

      fetchUser: async () => {
        set({ user: await getUserById(auth.currentUser?.uid ?? '') })
      },
      setUser: (user: UsersType | null) => set({ user }),
      setAwards26Viewed: (viewed: boolean) => set({ isAwards26Viewed: viewed }),
      setUserGuilds: (guilds: string[]) => set({ userGuilds: guilds }),
      setAutoViewNewLocales: (auto: boolean) => set({ autoViewNewLocales: auto }),
      resetUserStore: () => set(initialState),
    }),
    {
      name: 'user-storage',
    }
  )
);
