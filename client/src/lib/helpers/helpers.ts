export const statuses = ["ACTIVE", "INACTIVE"];

export const getLocalStorageArray = (key: string): any[] => {
    try {
        const item = localStorage.getItem(key);
        if (!item) return [];
        const parsed = JSON.parse(item);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};
