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