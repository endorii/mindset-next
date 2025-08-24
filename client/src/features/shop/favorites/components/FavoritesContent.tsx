"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import { UserFavoritesSkeleton } from "@/shared/ui/skeletons";
import { useState, useEffect } from "react";
import { useCurrentUser } from "../../user-info/hooks/useUsers";
import { useFavoritesFromUser, useDeleteFavorite } from "../hooks/useFavorites";
import { ILocalFavoriteItem, IFavoriteItem } from "../types/favorites.types";
import {
    saveFavoritesToStorage,
    getFavoritesFromStorage,
} from "../utils/favorites.utils";
import FavoriteCard from "./FavoriteCard";
import Image from "next/image";

function FavoritesContent() {
    const { data: user, isPending: isUserPending } = useCurrentUser();
    const {
        data: userFavorites,
        isPending: isUserFavoritesPending,
        isError: isUserFavoritesError,
    } = useFavoritesFromUser();

    const [localFavorites, setLocalFavorites] = useState<ILocalFavoriteItem[]>(
        []
    );

    const deleteFavoriteMutation = useDeleteFavorite();

    const removeFromLocalStorage = (productId: string) => {
        const updatedFavorites = localFavorites.filter(
            (item) => item.product.id !== productId
        );
        setLocalFavorites(updatedFavorites);
        saveFavoritesToStorage(updatedFavorites);
    };

    const removeFromServerFavorites = async (productId: string) => {
        try {
            deleteFavoriteMutation.mutateAsync(productId);
            console.log("Видалення з серверних вподобань:", productId);
        } catch (error) {
            console.error("Помилка видалення з серверних вподобань:", error);
        }
    };

    useEffect(() => {
        if (!user && !isUserPending) {
            const storedFavorites = getFavoritesFromStorage();
            setLocalFavorites(storedFavorites);
        }
    }, [user, isUserPending]);

    const favoritesToShow: IFavoriteItem[] | ILocalFavoriteItem[] = user
        ? userFavorites ?? []
        : localFavorites;
    return (
        <>
            {favoritesToShow && favoritesToShow.length > 0 ? (
                <ul className="grid grid-cols-4 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full gap-[15px] px-[30px]">
                    {favoritesToShow.map((item, i) => {
                        const isServer = !!user;

                        const handleRemove = () => {
                            if (isServer) {
                                removeFromServerFavorites(item.product.id);
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
            ) : isUserFavoritesPending ? (
                <UserFavoritesSkeleton />
            ) : user && isUserFavoritesError ? (
                <ErrorWithMessage message="Виникла помилка під час завантаження вподобаних товарів" />
            ) : (
                <div className="flex flex-col justify-center text-center items-center p-[30px] sm:p-[10px] sm:pb-[150px]">
                    <Image
                        src="/images/emptyfavorites.png"
                        alt={"1"}
                        width={300}
                        height={300}
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
        </>
    );
}

export default FavoritesContent;
