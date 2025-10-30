import { Timestamp } from "firebase/firestore";

type UsersType = {
    roleName?: string;
    tag: string;
    areYouMoreLikely: string;
    country: string;
    dataGroup: string;
    email: string;
    firstName: string;
    guild: string[];
    longGuild?: string[];
    id: string;
    lastName: string;
    lastNotification: {
        nanoseconds: number;
        seconds: number;
    };
    locale: string[] | string;
    movieTypes: string[];
    profilePhotoURL: string;
    pushNotificationTokens: string[];
    isAward26Viewed: boolean;
    verified: boolean;
    userSettings: {
        EMAIL_ABOUT_FEATURES?: boolean;
        FAVORITED_SCREENING_ADDED?: boolean;
        NEW_SCREENINGS?: boolean;
        SCREENING_ADDED_FOR_FAVORITE_VENUE?: boolean;
        SHARE_EMAIL_WITH_ADVERTISERS?: boolean;
        newEventAdded: boolean;
        newContentAdded: boolean;
        eventAddedForFavoritedProject: boolean;
        contentAddedForFavoritedProject: boolean;
        eventAddedAtFavoritedVenue: boolean;
        CapacityChangedToOpen: boolean;
        occasionalImportantUpdates: boolean;
        automaticallyViewNewLocales: boolean;
    };
    virtualFocusGroup: string;
    zipCode: string;
    firstLogin?: {
        nanoseconds: number;
        seconds: number;
    };
    lastLogin?: {
        nanoseconds: number;
        seconds: number;
    };
    verificationDate?: {
        nanoseconds: number;
        seconds: number;
    };
    verifiedStatus: string;
};

export interface News {
    id: string;
    newsTitle: string;
    dateAdded: Timestamp;
    newsContent: string;
    dataGroup: string[],
    tag: string;
}
export interface NewEventFavoriteStatus {
    [projectId: string]: number;
}

export interface Project {
    id: string;
    title?: string;
    guild?: string;
    studio?: string[];
    projectCategory?: string;
    projectType?: string[] | null;
    releaseDate?: Date | null;
    coverImageUrl?: string;
    posterUrl?: string;
    screenerAvailability?: string;
    lengthInMinutes?: number;
    credit?: string;
    creditLabel?: string;
    description?: string;
    fycCategoriesMarkdown?: string;
    additionalAssets?: string[];
    logoBackgroundColor?: string;
    logoImageUrl?: string;
    sortBy?: string;
    isPromoted?: boolean;
    tag: string;
}

export interface Venue {
    id: string;
    title?: string;
    description?: string;
    address?: string;
    locale?: string;
    coverImageUrl?: string;
    logoImageUrl?: string;
    tag: string;
}

export type LocalesType = {
    dataGroup: string[];
    editedByRole: {
        displayName: string;
        id: number;
        name: string;
        priority: number;
        uid: string;
    };
    dateAdded: { seconds: number; nanoseconds: number };
    lastEditedDate: {
        nanoseconds: number;
        seconds: number;
    };
    id: string;
    name: string;
    canonicalName: string;
    linkedVenue?: number;
    time?: string;
    timezone: string;
    tag: string;
    subgroup?: string;
    group?: string;
    order?: number;
}
interface LocaleNode {
    name: string;
    id: string;
    children: LocaleNode[];
    isLeaf: boolean;
}

type GuildsType = {
    id: string;
    longName: string;
    shortName: string;
    tag: string;
    isVerifiable: boolean;
    order?: number;
    dateAdded: { seconds: number; nanoseconds: number };
    lastEditedDate: {
        nanoseconds: number;
        seconds: number;
    };
    instructionsMarkdown?: string;
    instructionsSteps?: InstructionStepsType[];
    fields?: VerificationField[];
    editedByRole: {
        displayName: string;
        id: number;
        name: string;
        priority: number;
        uid: string;
    };
    usersCount?: number;
    verificationsCount?: number;
}
type InstructionStepsType = {
    id: string;
    instruction: string;
};
type VerificationField = {
    id: string;
    label: string;
    type: "text" | "date" | "image" | "number";
    enabled: boolean;
    required: boolean;
}

type VerificationStatus = "approved" | "pending" | "rejected" | "expired" | 'canceled' | "empty" | 'notVerifiable'

type GuildVerificationsType = {
    email: string;
    firstName: string;
    lastName: string;
    expirationDate: {
        nanoseconds: number;
        seconds: number;
    };
    validThrough: {
        nanoseconds: number;
        seconds: number;
    };
    guilds: string[];
    id: string;
    memberId: string;
    note: string;
    notes?: string;
    proofOfValidMembership: string;
    verificationImage?: string;
    tag: VerificationStatus;
    userId: string;
    verificationDate: {
        nanoseconds: number;
        seconds: number;
    };
    dataGroup: string[];
    queueUploadMetaInformation?: {
        timeForUpload: {
            seconds: number;
            nanoseconds: number;
        };
    };
}