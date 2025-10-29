import { readDataFromDb } from "@/firebase/helper";
import { News } from "@/types/collections";
import { NewStore } from "@/types/store";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
    news: [],
};

export const useNewsStore = create<NewStore>()(
    persist(
        (set) => ({
            ...initialState,
            setNews: (news) => set({ news }),
            fetchNews: async () => {
                try {
                    const fetchNews = await readDataFromDb<News>("fycitNews");
                    set({ news: fetchNews });
                } catch (error) {
                    console.error("Error fetching locales:", error);
                    set({ news: [] });
                }
            },
        }),
        {
            name: 'news-storage',
        }
    )
);