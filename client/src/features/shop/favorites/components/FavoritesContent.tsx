"use client";

import { useProductsByIds } from "@/features/products/hooks/useProducts";
import { ErrorWithMessage } from "@/shared/ui/components";
import { UserFavoritesSkeleton } from "@/shared/ui/skeletons";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import Image from "next/image";
import { useCurrentUser } from "../../user-info/hooks/useUsers";
import { useDeleteFavorite, useFavoritesFromUser } from "../hooks/useFavorites";
import FavoriteCard from "./FavoriteCard";

function FavoritesContent() {
    const { favoriteItems, removeFromFavorites } = useFavoritesStore();

    const deleteFavoriteFromUserMutation = useDeleteFavorite();

    const { data: user } = useCurrentUser();

    const {
        data: userFavorites,
        isPending: isUserFavoritesPending,
        isError: isUserFavoritesError,
    } = useFavoritesFromUser();

    const favProducts = user ? userFavorites || [] : favoriteItems;

    const { data: products, isPending: isProductsPending } =
        useProductsByIds(favProducts);

    const removeFavorite = (productId: string) => {
        if (user) {
            deleteFavoriteFromUserMutation.mutateAsync(productId);
        }
        {
            removeFromFavorites(productId);
        }
    };

    if ((user && isUserFavoritesPending) || isProductsPending) {
        return <UserFavoritesSkeleton />;
    }

    if (isUserFavoritesError) {
        return (
            <ErrorWithMessage message="Виникла помилка під час завантаження вподобаних товарів" />
        );
    }

    if (!products?.length) {
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
