import { IUser } from "@/features/shop/user-info/types/user.types";
import { ILocalFavoriteItem } from "@/features/shop/favorites/types/favorites.types";
import { IProduct } from "@/features/products/types/products.types";
import { useEffect, useState } from "react";

export default function useIsProductInFavorites(
    product: IProduct | undefined,
    user: IUser | undefined
) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!product) return;

        if (user) {
            const found = user.favorites?.some((item) => item.productId === product.id);
            setIsFavorite(Boolean(found));
        } else {
            try {
                const localFavorites = localStorage.getItem("favorites");
                const parsed: ILocalFavoriteItem[] = localFavorites
                    ? JSON.parse(localFavorites)
                    : [];
                const found = parsed.some((item) => item.product.id === product.id);
                setIsFavorite(Boolean(found));
            } catch (error) {
                console.error("Помилка зчитування localStorage:", error);
                setIsFavorite(false);
            }
        }
    }, [product, user]);

    return isFavorite;
}
