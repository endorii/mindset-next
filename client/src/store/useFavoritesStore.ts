import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface FavoritesStore {
    favoriteItems: string[];

    addToFavorites: (item: string) => void;
    removeFromFavorites: (productId: string) => void;
    toggleFavorite: (item: string) => void;
    clearFavorites: () => void;

    isInFavorites: (productId: string) => boolean;
    getFavoritesCount: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(
    devtools(
        persist(
            (set, get) => ({
                favoriteItems: [],

                addToFavorites: (item) => {
                    const exists = get().favoriteItems.some((f) => f === item);
                    if (exists) return;

                    set({
                        favoriteItems: [...get().favoriteItems, item],
                    });
                },

                removeFromFavorites: (productId) => {
                    set({
                        favoriteItems: get().favoriteItems.filter((f) => f !== productId),
                    });
                },

                toggleFavorite: (item) => {
                    get().isInFavorites(item)
                        ? get().removeFromFavorites(item)
                        : get().addToFavorites(item);
                },

                clearFavorites: () => {
                    set({ favoriteItems: [] });
                },

                isInFavorites: (productId) => get().favoriteItems.some((f) => f === productId),

                getFavoritesCount: () => get().favoriteItems.length,
            }),
            { name: "favorites-storage" }
        )
    )
);
