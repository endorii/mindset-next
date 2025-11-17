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
            <ErrorWithMessage message="Виникла помилка під час завантаження вподобаних товарів" />
        );
    }

    if (!products?.length) {
        return (
            <div className="flex flex-col gap-[30px] text-white items-center justify-center min-h-[50vh] pb-[100px]">
                <ShopTitle title={"Your favorite list is empty"} />
                <MonoButton onClick={() => router.push("/#collections")}>
                    Start exploring
                </MonoButton>
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
