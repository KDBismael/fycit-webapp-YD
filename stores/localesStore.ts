import { readDataFromDb } from "@/firebase/helper";
import { LocalesType } from "@/types/collections";
import { LocalesStore } from "@/types/store";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
    locales: [],
};

export const useLocalesStore = create<LocalesStore>()(
    persist(
        (set) => ({
            ...initialState,
            setLocales: (locales) => set({ locales }),
            fetchLocales: async () => {
                try {
                    const fetchedLocales = await readDataFromDb<LocalesType>("locales");
                    set({ locales: fetchedLocales.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) });
                } catch (error) {
                    console.error("Error fetching locales:", error);
                    set({ locales: [] });
                }
            },
        }),
        {
            name: 'locales-storage',
        }
    )
);