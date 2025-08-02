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
import Image from "next/image";
import { useState, useEffect } from "react";

export const Favorites = () => {
    const { data: user, isLoading, error } = useCurrentUser();
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

    console.log("user:", user);
    console.log("userFavorites:", userFavorites);
    console.log("localFavorites:", localFavorites);
    console.log("favoritesToShow:", favoritesToShow);

    return (
        <div className="flex flex-col gap-[50px] mt-[30px]">
            <div className="text-white relative px-[70px]">
                <div className="text-8xl font-extrabold">Вподобані</div>
                <div className="absolute top-[40px] left-[70px] text-8xl font-qwitcher-grypen text-white/40">
                    Favorites
                </div>
            </div>
            {favoritesToShow && favoritesToShow.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-[20px] px-[30px]">
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
                <div className="flex flex-col justify-center items-center p-[30px] pt-30px] pb-[100px]">
                    <Image
                        src="/images/emptyfavorites.png"
                        alt={"1"}
                        width={300}
                        height={0}
                    />
                    <div className="font-semibold text-4xl text-white/70">
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
