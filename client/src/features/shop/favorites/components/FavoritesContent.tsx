"use client";

import { useProductsByIds } from "@/features/products/hooks/useProducts";
import { ErrorWithMessage } from "@/shared/ui/components";
import { UserFavoritesSkeleton } from "@/shared/ui/skeletons";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { useMemo } from "react";
import { useCurrentUser } from "../../user-info/hooks/useUsers";
import { useDeleteFavorite, useFavoritesFromUser } from "../hooks/useFavorites";
import FavoriteCard from "./FavoriteCard";

function FavoritesContent() {
    const { accessToken } = useUserStore();
    const {
        data: user,
        isPending: isUserPending,
        isError: isUserError,
    } = useCurrentUser();
    const {
        data: userFavorites,
        isPending: isUserFavoritesPending,
        isError: isUserFavoritesError,
    } = useFavoritesFromUser();

    const { favoriteItems, removeFromFavorites } = useFavoritesStore();
    const deleteFavoriteMutation = useDeleteFavorite();

    const favoriteIds = useMemo(() => {
        // Авторизований користувач - дані з бекенду
        if (userFavorites) {
            return userFavorites;
        }
        // Неавторизований - дані з локального store
        if (!accessToken) {
            return favoriteItems;
        }
        // Завантаження
        return [];
    }, [accessToken, userFavorites, favoriteItems]);

    const {
        data: products,
        isPending: isProductsPending,
        isError,
    } = useProductsByIds(favoriteIds.length > 0 ? favoriteIds : undefined);

    const removeFavorite = async (productId: string) => {
        if (user && !isUserFavoritesError) {
            await deleteFavoriteMutation.mutateAsync(productId);
        } else {
            removeFromFavorites(productId);
        }
    };

    console.log("=== DEBUG ===");
    console.log("accessToken:", accessToken);
    console.log("user:", user);
    console.log("isUserPending:", isUserPending);
    console.log("isUserError:", isUserError);

    // Показуємо скелетон тільки якщо завантажуємо
    if (isUserFavoritesPending || isProductsPending) {
        return <UserFavoritesSkeleton />;
    }

    if (isError || isUserFavoritesError) {
        return (
            <ErrorWithMessage message="Виникла помилка під час завантаження вподобаних товарів" />
        );
    }

    if (!favoriteIds.length || !products?.length) {
        return (
            <div className="flex flex-col justify-center text-center items-center p-[30px] sm:p-[10px] sm:pb-[150px]">
                <Image
                    src="/images/emptyfavorites.png"
                    alt="Empty favorites"
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
        );
    }

    return (
        <ul className="grid grid-cols-4 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full gap-[15px] px-[30px]">
            {products.map((product) => (
                <FavoriteCard
                    key={product.id}
                    product={product}
                    onRemove={() => removeFavorite(product.id)}
                />
            ))}
        </ul>
    );
}

export default FavoritesContent;
