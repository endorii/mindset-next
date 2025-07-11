"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import FavoriteCard from "@/features/favorites/components/FavoriteCard";
import { useDeleteFavorite } from "@/features/favorites/hooks/useFavorites";
import {
    ILocalFavoriteItem,
    IFavoriteItem,
} from "@/features/favorites/types/favorites.types";
import {
    getFavoritesFromStorage,
    saveFavoritesToStorage,
} from "@/features/favorites/utils/favorites.utils";
import H3 from "@/shared/ui/text/H3";
import React, { useState, useEffect } from "react";

export const Favorites = () => {
    const { data: user, isLoading, error } = useCurrentUser();
    const [localFavorites, setLocalFavorites] = useState<ILocalFavoriteItem[]>(
        []
    );

    const deleteFavorite = useDeleteFavorite();

    const removeFromLocalStorage = (productId: string) => {
        const updatedFavorites = localFavorites.filter(
            (item) => item.product.id !== productId
        );
        setLocalFavorites(updatedFavorites);
        saveFavoritesToStorage(updatedFavorites);
    };

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

    return (
        <div className="relative">
            <H3>Вподобане</H3>
            {favoritesToShow.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full pt-[120px] p-[30px] gap-[20px]">
                    {favoritesToShow.map((item, i) => {
                        const isServer = !!user;

                        if (!item.product) return null;

                        const handleRemove = () => {
                            if (isServer) {
                                removeFromServerFavorites(
                                    user.id,
                                    item.product.id
                                );
                            } else {
                                removeFromLocalStorage(item.productId);
                            }
                        };

                        return (
                            <FavoriteCard
                                key={`${item.productId}`}
                                product={item.product}
                                onRemove={handleRemove}
                                color={item.color}
                                type={item.type}
                                size={item.size}
                                index={i}
                                id={item.productId}
                            />
                        );
                    })}
                </ul>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="text-white text-center mt-[230px] text-[24px] uppercase font-bold rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[30px] py-[15px]">
                        У вас поки немає вподобаних товарів
                    </div>
                </div>
            )}
        </div>
    );
};

export default Favorites;
