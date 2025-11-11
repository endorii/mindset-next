"use client";

import { useProductsByIds } from "@/features/products/hooks/useProducts";
import { ErrorWithMessage } from "@/shared/ui/components";
import { UserCartSkeleton } from "@/shared/ui/skeletons";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { useCurrentUser } from "../../user-info/hooks/useUsers";
import {
    useCartItemsFromUser,
    useDeleteCartItemFromUser,
} from "../hooks/useCart";
import { CartItem } from "./CartItem";
import { CartReceip } from "./CartReceip";

export function CartContent() {
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
            console.error("Помилка видалення:", error);
        }
    };

    if (isUserCartPending || isProductsPending) {
        return <UserCartSkeleton />;
    }

    if (user && isUserCartError) {
        return (
            <ErrorWithMessage message="Виникла помилка під час завантаження кошику" />
        );
    }

    if (!mergedCart.length) {
        return (
            <div className="flex flex-col justify-center text-center items-center p-[30px] sm:p-[10px] sm:pb-[150px]">
                <Image
                    src="/images/emptycart.png"
                    alt="empty cart"
                    width={300}
                    height={300}
                    className="opacity-30 w-[300px] sm:w-[200px]"
                />
                <div className="font-semibold text-4xl md:text-3xl text-white/50">
                    Ваш кошик порожній
                </div>
                <div className="font mt-[7px] text-white/30">
                    Наповніть його товарами!
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between gap-[15px] w-full px-[30px]">
            <div className="flex flex-col gap-[15px] w-2/3 max-h-[80vh] overflow-y-auto">
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
    );
}
