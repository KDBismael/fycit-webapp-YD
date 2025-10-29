import { useGuildsStore } from "@/stores/guildsStore";
import { useLocalesStore } from "@/stores/localesStore";
import { useEffect } from "react";

export const useLoadInitialData = () => {
    const { fetchLocales } = useLocalesStore();
    const { fetchGuilds } = useGuildsStore();

    const loadGuildsAndLocales = async () => {
        await Promise.all([fetchGuilds(), fetchLocales()]);
    }

    useEffect(() => {
        loadGuildsAndLocales();
    }, []);
}