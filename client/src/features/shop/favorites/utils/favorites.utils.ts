import { ILocalFavoriteItem } from "../types/favorites.types";

export const getFavoritesFromStorage = (): ILocalFavoriteItem[] => {
    try {
        const favorites = localStorage.getItem("favorites");
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error("Помилка при читанні localStorage:", error);
        return [];
    }
};

export const saveFavoritesToStorage = (favorites: ILocalFavoriteItem[]) => {
    try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
        console.error("Помилка при збереженні в localStorage:", error);
    }
};
