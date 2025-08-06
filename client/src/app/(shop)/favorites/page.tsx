"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import FavoriteCard from "@/features/favorites/components/FavoriteCard";
import {
    useFavoritesFromUser,
    useDeleteFavorite,
} from "@/features/favorites/hooks/useFavorites";
import {
    ILocalFavoriteItem,
    IFavoriteItem,
} from "@/features/favorites/types/favorites.types";
import {
    saveFavoritesToStorage,
    getFavoritesFromStorage,
} from "@/features/favorites/utils/favorites.utils";
import { PopularProducts } from "@/shared/components";
import ShopTitle from "@/shared/ui/titles/ShopTitle";
import Image from "next/image";
import { useState, useEffect } from "react";

export const Favorites = () => {
    const { data: user, isPending, error } = useCurrentUser();
    const { data: userFavorites } = useFavoritesFromUser(user?.id ?? "");

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
            deleteFavorite.mutateAsync({ userId, productId });
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

    const favoritesToShow: IFavoriteItem[] | ILocalFavoriteItem[] = user
        ? userFavorites ?? []
        : localFavorites;

    if (isPending) {
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
        <div className="flex flex-col gap-[50px]">
            <ShopTitle title="Вподобані" subtitle="Favorites" />
            {favoritesToShow && favoritesToShow.length > 0 ? (
                <ul className="grid grid-cols-4 w-full gap-[15px] px-[30px]">
                    {favoritesToShow.map((item, i) => {
                        const isServer = !!user;

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
                                key={i}
                                onRemove={handleRemove}
                                item={item}
                            />
                        );
                    })}
                </ul>
            ) : (
                <div className="flex flex-col justify-center text-center items-center p-[30px] sm:p-[10px] sm:pb-[150px]">
                    <Image
                        src="/images/emptyfavorites.png"
                        alt={"1"}
                        width={300}
                        height={0}
                        className="opacity-30 w-[300px] sm:w-[200px]"
                    />
                    <div className="font-semibold text-4xl md:text-3xl text-white/50">
                        Немає вподобаних товарів
                    </div>
                    <div className="font mt-[7px] text-white/30">
                        Змініть це, додайте щось!
                    </div>
                </div>
            )}
            <PopularProducts />
        </div>
    );
};

export default Favorites;
