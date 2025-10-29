import { readDataFromDb } from "@/firebase/helper";
import { GuildsType } from "@/types/collections";
import { GuildsStore } from "@/types/store";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
    guilds: [],
};

export const useGuildsStore = create<GuildsStore>()(
    persist(
        (set) => ({
            ...initialState,
            setGuilds: (guilds) => set({ guilds }),
            fetchGuilds: async () => {
                try {
                    const fetchedGuilds = await readDataFromDb<GuildsType>("guilds");
                    set({ guilds: fetchedGuilds.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) });
                } catch (error) {
                    console.error("Error fetching guilds:", error);
                    set({ guilds: [] });
                }
            },
        }),
        {
            name: 'guilds-storage',
        }
    )
);