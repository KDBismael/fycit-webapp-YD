import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  isAwards26Viewed: boolean;
  userGuilds: string[];
  autoViewNewLocales: boolean;
  
  setAwards26Viewed: (viewed: boolean) => void;
  setUserGuilds: (guilds: string[]) => void;
  setAutoViewNewLocales: (auto: boolean) => void;
  resetUserStore: () => void;
}

const initialState = {
  isAwards26Viewed: false,
  userGuilds: [],
  autoViewNewLocales: false,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      
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
