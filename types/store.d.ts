import { GuildsType, LocalesType, UsersType } from "./collections";

export interface VenueState {
    venues: Venue[];
    filteredVenues: Venue[];
    favoriteVenues: string[];
    selectedLocales: string[];

    searchTerm: string;
    selectedVenueId: string;
    onlyShowFavorites: boolean;
    loading: boolean;

    reset: () => void;

    setAllVenues: (venues: Venue[]) => void;
    toggleFavoriteVenue: (venueId: string) => void;
    setSearchTerm: (term: string) => void;
    updateFilteredLocales: (locale: string) => void;
    setSelectedVenueId: (venueId: string) => void;
    updateFilteredFavorites: () => void;
    applyChanges: () => void;
    setFavorites: (favoriteVenueIds: string[]) => void;
    fetchAllVenues: () => Promise<void>;
    fetchFavoriteVenues: () => Promise<void>;
    saveFavoriteVenues: () => Promise<void>;
}

export interface ProjectState {
    favoriteOrSeenProjects: Record<string, NewEventFavoriteStatusEnum>;
    allProjects: Record<string, Project>;
    filteredProjects: Record<string, Project>;
    favoriteProjectsList: Project[];
    seenProjectsList: Project[];
    selectedProjectId: string;
    searchTerm: string;
    loading: boolean;

    setAllProjects: (projects: Project[]) => void;
    setFavoritesMap: (map: Record<string, NewEventFavoriteStatusEnum>) => void;
    setSelectedProjectId: (projectId: string) => void;
    updateFilteredProjects: (searchTerm?: string) => void;

    toggleFavoriteProject: (projectId: string) => void;
    onboardingOnlyUntoggleFavoriteProject: (projectId: string) => void;
    toggleFavoriteProjectFromProfile: (projectId: string) => void;

    fetchAllProjects: () => Promise<void>;
    fetchProjectFavorites: () => Promise<void>;
    saveFavorites: () => Promise<void>;
}

interface UserStore {
    user: UsersType | null;
    isAwards26Viewed: boolean;
    userGuilds: string[];
    autoViewNewLocales: boolean;

    setUser: (user: UsersType | null) => void;
    fetchUser: () => Promise<void>;
    setAwards26Viewed: (viewed: boolean) => void;
    setUserGuilds: (guilds: string[]) => void;
    setAutoViewNewLocales: (auto: boolean) => void;
    resetUserStore: () => void;
}

interface GuildsStore {
    guilds: GuildsType[];
    setGuilds: (guilds: GuildsType[]) => void;
    fetchGuilds: () => Promise<void>;
}

interface LocalesStore {
    locales: LocalesType[];
    setLocales: (locales: LocalesType[]) => void;
    fetchLocales: () => Promise<void>;
}

