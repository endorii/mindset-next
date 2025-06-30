"use client";

import { useState, useEffect } from "react";
import {
    IFavoriteItem,
    ILocalFavoriteItem,
} from "@/types/favorite/favorite.types";
import { useCurrentUser } from "@/lib/hooks/useUsers";
import FavoriteItemCard from "@/components/UserPage/Favorite/FavoriteItemCard";
import { useDeleteFavorite } from "@/lib/hooks/useFavorites";

function Likes() {
    const { data: user, isLoading, error } = useCurrentUser();
    const [localFavorites, setLocalFavorites] = useState<ILocalFavoriteItem[]>(
        []
    );

    const getFavoritesFromStorage = (): ILocalFavoriteItem[] => {
        try {
            const favorites = localStorage.getItem("favorites");
            return favorites ? JSON.parse(favorites) : [];
        } catch (error) {
            console.error("Помилка при читанні localStorage:", error);
            return [];
        }
    };

    const saveFavoritesToStorage = (favorites: ILocalFavoriteItem[]) => {
        try {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } catch (error) {
            console.error("Помилка при збереженні в localStorage:", error);
        }
    };

    const removeFromLocalStorage = (productId: string) => {
        const updatedFavorites = localFavorites.filter(
            (item) => item.product.id !== productId
        );
        setLocalFavorites(updatedFavorites);
        saveFavoritesToStorage(updatedFavorites);
    };

    const deleteFavorite = useDeleteFavorite();

    const removeFromServerFavorites = async (
        userId: string,
        productId: string
    ) => {
        try {
            deleteFavorite.mutate({ userId, productId });
            console.log("Видалення з серверних вподобань:", productId);
        } catch (error) {
            console.error("Помилка видалення з серверних вподобань:", error);
        }
    };

    useEffect(() => {
        if (!user) {
            const storedFavorites = getFavoritesFromStorage();
            setLocalFavorites(storedFavorites);
        }
    }, [user]);

    const serverFavorites: IFavoriteItem[] = user?.favorites || [];

    const favoritesToShow = user ? serverFavorites : localFavorites;

    if (isLoading) {
        return <p>Завантаження улюбленого...</p>;
    }

    if (error && user) {
        return (
            <p>
                Помилка завантаження улюбленого:{" "}
                {error.message || "Невідома помилка"}
            </p>
        );
    }

    if (!favoritesToShow || favoritesToShow.length === 0) {
        return (
            <div className="flex justify-center items-center">
                <div className="text-white text-center mt-[150px] text-[24px] uppercase font-bold rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[30px] py-[15px]">
                    {user
                        ? "У вас поки немає вподобаних товарів"
                        : "Вподобані товари відсутні"}
                </div>
            </div>
        );
    }

    return (
        <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full p-[30px] gap-[20px]">
                {favoritesToShow.map((item, i) => {
                    const isServer = !!user;

                    const product = item.product;
                    const id = item.productId;

                    if (!product) return null;

                    const handleRemove = () => {
                        if (isServer) {
                            removeFromServerFavorites(user.id, item.product.id);
                        } else {
                            removeFromLocalStorage(id);
                        }
                    };

                    return (
                        <FavoriteItemCard
                            key={`${isServer ? "server" : "local"}-${id}-${i}`}
                            product={product}
                            onRemove={handleRemove}
                            color={item.color}
                            type={item.type}
                            size={item.size}
                            index={i}
                            id={id}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default Likes;
