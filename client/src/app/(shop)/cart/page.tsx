import { CartContent } from "@/features/shop/cart/components/CartContent";
import { PopularProductsWrapper } from "@/shared/components/providers/PopularProductsWrapper";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";

function Cart() {
    return (
        <div className="flex flex-col gap-[10px] mt-[10px] text-white">
            <ShopTitle title="Cart" />
            <CartContent />
            <PopularProductsWrapper />
        </div>
    );
}

export default Cart;
