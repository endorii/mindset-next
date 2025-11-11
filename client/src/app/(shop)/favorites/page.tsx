import { FavoritesContent } from "@/features/shop/favorites/components/FavoritesContent";
import { PopularProductsWrapper } from "@/shared/components/providers/PopularProductsWrapper";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";

export const Favorites = () => {
    return (
        <div className="flex flex-col gap-[50px]">
            <ShopTitle title="Вподобані" subtitle="Favorites" />
            <FavoritesContent />
            <PopularProductsWrapper />
        </div>
    );
};

export default Favorites;
