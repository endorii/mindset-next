"use client";

import { IProduct } from "@/features/products/types/products.types";
import { ICartItem } from "@/features/shop/cart/types/cart.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartStore {
    cartItems: ICartItem[];

    addToCart: (product: Partial<IProduct>, size: string, color: string, type: string) => void;
    removeFromCart: (productId: string, size: string, color: string, type: string) => void;
    updateQuantity: (
        productId: string,
        size: string,
        color: string,
        type: string,
        quantity: number
    ) => void;

    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemsCount: () => number;
}

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set, get) => ({
                cartItems: [],

                // ✅ ADD TO CART
                addToCart: (product, size, color, type) => {
                    set((state) => {
                        const existingItem = state.cartItems.find(
                            (item) =>
                                item.productId === product.id &&
                                item.size === size &&
                                item.color === color &&
                                item.type === type
                        );

                        if (existingItem) {
                            return {
                                cartItems: state.cartItems.map((item) =>
                                    item.productId === product.id &&
                                    item.size === size &&
                                    item.color === color &&
                                    item.type === type
                                        ? { ...item, quantity: item.quantity + 1 }
                                        : item
                                ),
                            };
                        }

                        const newItem: ICartItem = {
                            product,
                            productId: product.id,
                            size,
                            color,
                            type,
                            quantity: 1,
                        };

                        return {
                            cartItems: [...state.cartItems, newItem],
                        };
                    });
                },

                // ✅ REMOVE
                removeFromCart: (productId, size, color, type) => {
                    set((state) => ({
                        cartItems: state.cartItems.filter(
                            (item) =>
                                !(
                                    item.productId === productId &&
                                    item.size === size &&
                                    item.color === color &&
                                    item.type === type
                                )
                        ),
                    }));
                },

                // ✅ UPDATE QUANTITY
                updateQuantity: (productId, size, color, type, quantity) => {
                    if (quantity <= 0) {
                        get().removeFromCart(productId, size, color, type);
                        return;
                    }

                    set((state) => ({
                        cartItems: state.cartItems.map((item) =>
                            item.productId === productId &&
                            item.size === size &&
                            item.color === color &&
                            item.type === type
                                ? { ...item, quantity }
                                : item
                        ),
                    }));
                },

                // ✅ CLEAR
                clearCart: () => {
                    set({ cartItems: [] });
                },

                // ✅ GET TOTAL
                getCartTotal: () => {
                    return get().cartItems.reduce(
                        (total, item) => total + item.product.price * item.quantity,
                        0
                    );
                },

                // ✅ GET COUNT
                getCartItemsCount: () => {
                    return get().cartItems.reduce((count, item) => count + item.quantity, 0);
                },
            }),
            {
                name: "cart-storage",
            }
        )
    )
);
