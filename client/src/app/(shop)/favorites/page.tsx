import { FavoritesContent } from "@/features/shop/favorites/components/FavoritesContent";
import { PopularProductsWrapper } from "@/shared/components/providers/PopularProductsWrapper";

export default function FavoritesPage() {
    return (
        <div className="relative flex flex-col gap-[10px] mt-[10px] ">
            <FavoritesContent />
            <PopularProductsWrapper />
        </div>
    );
}
