"use client";

import { useProductsByIds } from "@/features/products/hooks/useProducts";
import { MonoButton } from "@/shared/ui/buttons";
import { ErrorWithMessage } from "@/shared/ui/components";
import { UserFavoritesSkeleton } from "@/shared/ui/skeletons";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "../../user-info/hooks/useUsers";
import { useDeleteFavorite, useFavoritesFromUser } from "../hooks/useFavorites";
import { FavoriteCard } from "./FavoriteCard";

export function FavoritesContent() {
    const router = useRouter();
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
        } else {
            removeFromFavorites(productId);
        }
    };

    if ((user && isUserFavoritesPending) || isProductsPending) {
        return <UserFavoritesSkeleton />;
    }

    if (isUserFavoritesError) {
        return (
            <ErrorWithMessage message="An error occurred while loading your favorite products." />
        );
    }

    if (!products?.length) {
        return (
            <div className="flex flex-col gap-[30px] text-white items-center text-center justify-center h-screen pb-[200px] md:pb-[100px]">
                <ShopTitle title={"Your favorite list is empty"} />
                <MonoButton onClick={() => router.push("/#collections")}>
                    Start exploring
                </MonoButton>
            </div>
        );
    }

    return (
        <>
            <ShopTitle title="Favorites" />
            <ul className="grid grid-cols-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 xxs:grid-cols-1 w-full gap-[15px] px-[30px] sm:px-[10px]">
                {products.map((product) => (
                    <FavoriteCard
                        key={product.id}
                        product={product}
                        onRemove={() => removeFavorite(product.id)}
                    />
                ))}
            </ul>
        </>
    );
}
