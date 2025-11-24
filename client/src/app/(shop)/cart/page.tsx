import { CartContent } from "@/features/shop/cart/components/CartContent";
import { PopularProductsWrapper } from "@/shared/components/providers/PopularProductsWrapper";

function Cart() {
    return (
        <div className="flex flex-col gap-[10px] mt-[10px] text-white">
            <CartContent />
            <PopularProductsWrapper />
        </div>
    );
}

export default Cart;
