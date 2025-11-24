"use client";

import { useProductsByIds } from "@/features/products/hooks/useProducts";
import { MonoButton } from "@/shared/ui/buttons";
import { ErrorWithMessage } from "@/shared/ui/components";
import { UserCartSkeleton } from "@/shared/ui/skeletons";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "../../user-info/hooks/useUsers";
import {
    useCartItemsFromUser,
    useDeleteCartItemFromUser,
} from "../hooks/useCart";
import { CartItem } from "./CartItem";
import { CartReceip } from "./CartReceip";

export function CartContent() {
    const router = useRouter();
    const { cartItems, removeFromCart } = useCartStore();

    const deleteCartItemMutation = useDeleteCartItemFromUser();

    const { data: user } = useCurrentUser();

    const {
        data: userCartItems,
        isPending: isUserCartPending,
        isError: isUserCartError,
    } = useCartItemsFromUser();

    const cartToShow = user ? userCartItems ?? [] : cartItems;

    const { data: products, isPending: isProductsPending } = useProductsByIds(
        cartToShow.map((item) => item.productId)
    );

    const mergedCart = cartToShow.map((item) => {
        const product = products?.find((p) => p.id === item.productId);
        return { ...item, product };
    });

    const totalPrice = mergedCart.reduce((total, item) => {
        if (!item?.product) return total;
        return total + item.product.price * item.quantity;
    }, 0);

    const removeCartItemFromServer = async (cartItemId: string | undefined) => {
        if (!cartItemId) return;
        try {
            await deleteCartItemMutation.mutateAsync(cartItemId);
        } catch (error) {
            console.error("Error Deletting:", error);
        }
    };

    if (isUserCartPending || isProductsPending) {
        return <UserCartSkeleton />;
    }

    if (user && isUserCartError) {
        return (
            <ErrorWithMessage message="An error occurred while loading the cart." />
        );
    }

    if (!mergedCart.length) {
        return (
            <div className="flex flex-col gap-[30px] text-white items-center text-center justify-center h-screen pb-[200px]">
                <ShopTitle title={"Your cart is empty"} />
                <MonoButton onClick={() => router.push("/#collections")}>
                    Start shopping
                </MonoButton>
            </div>
        );
    }

    return (
        <>
            <ShopTitle title="Cart" />
            <div className="flex justify-between gap-[15px] w-full px-[30px]">
                <div className="flex flex-col gap-[10px] w-2/3 max-h-[80vh] overflow-y-auto">
                    {mergedCart.map((item) => {
                        const isServer = !!user;

                        const handleRemove = () => {
                            if (isServer) {
                                removeCartItemFromServer(item?.id);
                            } else {
                                removeFromCart(item.productId);
                            }
                        };

                        return (
                            <CartItem
                                key={item.id ?? item.productId}
                                item={item}
                                handleRemove={handleRemove}
                            />
                        );
                    })}
                </div>

                <CartReceip totalPrice={totalPrice} />
            </div>
        </>
    );
}
