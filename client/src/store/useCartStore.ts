import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface CartItem extends Product {
    size: string;
    color: string;
    quantity: number;
}

interface CartStore {
    cartItems: CartItem[];

    addToCart: (product: Product, size: string, color: string) => void;
    removeFromCart: (productId: string, size: string, color: string) => void;
    updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartcartItemsCount: () => number;
}

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set, get) => ({
                cartItems: [],

                addToCart: (product, size, color) => {
                    set((state) => {
                        const existingItem = state.cartItems.find(
                            (item) =>
                                item.id === product.id && item.size === size && item.color === color
                        );

                        if (existingItem) {
                            return {
                                cartItems: state.cartItems.map((item) =>
                                    item.id === product.id &&
                                    item.size === size &&
                                    item.color === color
                                        ? { ...item, quantity: item.quantity + 1 }
                                        : item
                                ),
                            };
                        }

                        return {
                            cartItems: [
                                ...state.cartItems,
                                { ...product, size, color, quantity: 1 },
                            ],
                        };
                    });
                },

                removeFromCart: (productId, size, color) => {
                    set((state) => ({
                        cartItems: state.cartItems.filter(
                            (item) =>
                                !(
                                    item.id === productId &&
                                    item.size === size &&
                                    item.color === color
                                )
                        ),
                    }));
                },

                updateQuantity: (productId, size, color, quantity) => {
                    if (quantity <= 0) {
                        get().removeFromCart(productId, size, color);
                        return;
                    }

                    set((state) => ({
                        cartItems: state.cartItems.map((item) =>
                            item.id === productId && item.size === size && item.color === color
                                ? { ...item, quantity }
                                : item
                        ),
                    }));
                },

                clearCart: () => {
                    set({ cartItems: [] });
                },

                getCartTotal: () => {
                    return get().cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                    );
                },

                getCartcartItemsCount: () => {
                    return get().cartItems.reduce((count, item) => count + item.quantity, 0);
                },
            }),
            {
                name: "cart-storage",
            }
        )
    )
);
