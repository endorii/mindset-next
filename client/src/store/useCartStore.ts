"use client";

import { ICartItem } from "@/features/shop/cart/types/cart.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartStore {
    cartItems: ICartItem[];

    addToCart: (
        productId: string,
        size: string,
        color: string,
        type: string,
        quantity?: number
    ) => void;

    removeFromCart: (productId: string) => void;

    updateQuantity: (
        productId: string,
        size: string,
        color: string,
        type: string,
        quantity: number
    ) => void;

    clearCart: () => void;
    getCartItemsCount: () => number;
}

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set, get) => ({
                cartItems: [],

                addToCart: (productId, size, color, type, quantity = 1) => {
                    set((state) => {
                        const existingItem = state.cartItems.find(
                            (item) =>
                                item.productId === productId &&
                                item.size === size &&
                                item.color === color &&
                                item.type === type
                        );

                        if (existingItem) {
                            return {
                                cartItems: state.cartItems.map((item) =>
                                    item.productId === productId &&
                                    item.size === size &&
                                    item.color === color &&
                                    item.type === type
                                        ? { ...item, quantity: item.quantity + quantity }
                                        : item
                                ),
                            };
                        }

                        const newItem: ICartItem = {
                            id: crypto.randomUUID(),
                            productId,
                            size,
                            color,
                            type,
                            quantity,
                        };

                        return {
                            cartItems: [...state.cartItems, newItem],
                        };
                    });
                },

                removeFromCart: (productId) => {
                    set((state) => ({
                        cartItems: state.cartItems.filter(
                            (item) => !(item.productId === productId)
                        ),
                    }));
                },

                updateQuantity: (productId, size, color, type, quantity) => {
                    if (quantity <= 0) {
                        get().removeFromCart(productId);
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

                clearCart: () => {
                    set({ cartItems: [] });
                },

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
