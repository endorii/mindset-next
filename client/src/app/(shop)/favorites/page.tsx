import { FavoritesContent } from "@/features/shop/favorites/components/FavoritesContent";
import { PopularProductsWrapper } from "@/shared/components/providers/PopularProductsWrapper";

export default function FavoritesPage() {
    return (
        <div className="relative flex flex-col gap-[10px] mt-[10px] ">
            <FavoritesContent />

            {/* <Image
                src={"/crown.png"}
                alt="crown"
                width={350}
                height={350}
                className="w-[350px] absolute top-[50%] left-[7%] rotate-320 z-0 animate-wobble"
            /> */}
            <PopularProductsWrapper />
        </div>
    );
}
