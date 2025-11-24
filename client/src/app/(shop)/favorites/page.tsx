import { FavoritesContent } from "@/features/shop/favorites/components/FavoritesContent";
import { PopularProductsWrapper } from "@/shared/components/providers/PopularProductsWrapper";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";
import Image from "next/image";

export const Favorites = () => {
    return (
        <div className="relative flex flex-col gap-[10px] mt-[10px] ">
            <div className="flex flex-col gap-[10px] z-1">
                <ShopTitle title="Favorites" />
                <FavoritesContent />
            </div>
            <Image
                src={"/crown.png"}
                alt="crown"
                width={350}
                height={350}
                className="w-[350px] absolute top-[50%] left-[7%] rotate-320 z-0 animate-wobble"
            />
            <PopularProductsWrapper />
        </div>
    );
};

export default Favorites;
