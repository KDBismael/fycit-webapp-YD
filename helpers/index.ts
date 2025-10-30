import { GuildsType, GuildVerificationsType, VerificationStatus } from "@/types/collections";

export function toCamelCase(str: string) {
    let cleanedStr = str.toLowerCase();
    cleanedStr = cleanedStr.replace(/([-_ ])(\w)/g, (_, separator, char) => char.toUpperCase());
    return cleanedStr.charAt(0).toLowerCase() + cleanedStr.slice(1);
}

export function formatToOrdinalDate(date?: Date) {
    if (!date) return ''
    const getOrdinalSuffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const year = date.getFullYear();

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}

const STATUS_RANK: Record<VerificationStatus, number> = {
    approved: 1,
    pending: 2,
    rejected: 3,
    expired: 4,
    canceled: 5,
    empty: 6,
    notVerifiable: 7
};

export const buildGuildStatusIndex = (
    verifications: GuildVerificationsType[]
): Record<string, VerificationStatus> => {
    const index: Record<string, VerificationStatus> = {};
    for (const v of verifications) {
        const tag = v.tag ?? "empty";
        for (const name of v.guilds ?? []) {
            index[name] = tag;
        }
    }

    return index;
};

export const makeStatusGetter = (
    index: Record<string, VerificationStatus>
) => (longName: string): VerificationStatus => index[longName] ?? "empty";

export const sortByVerificationStatus = (
    data: GuildsType[],
    statusIndex: Record<string, VerificationStatus>
): GuildsType[] => {
    const statusOf = makeStatusGetter(statusIndex);
    return [...data].sort(
        (a, b) => a.isVerifiable && b.isVerifiable ?
            STATUS_RANK[statusOf(a.longName)] - STATUS_RANK[statusOf(b.longName)] : -1
    );
};