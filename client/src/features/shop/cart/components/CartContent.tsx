"use client";

import { IProduct } from "@/features/products/types/products.types";
import { ErrorWithMessage } from "@/shared/ui/components";
import { UserCartSkeleton } from "@/shared/ui/skeletons";
import React, { useEffect, useState } from "react";
import {
    useAddFavorite,
    useDeleteFavorite,
} from "../../favorites/hooks/useFavorites";
import { ILocalFavoriteItem } from "../../favorites/types/favorites.types";
import { useCurrentUser } from "../../user-info/hooks/useUsers";
import {
    useCartItemsFromUser,
    useDeleteCartItemFromUser,
} from "../hooks/useCart";
import { ICartItem } from "../types/cart.types";
import CartItem from "./CartItem";
import CartReceip from "./CartReceip";
import Image from "next/image";

function CartContent() {
    const { data: user, isPending: isUserPending } = useCurrentUser();
    const {
        data: userCart,
        isPending: isUserCartPending,
        isError: isUserCartError,
    } = useCartItemsFromUser();

    const [localCart, setLocalCart] = useState<ICartItem[]>([]);
    const [isLocalCartLoaded, setIsLocalCartLoaded] = useState(false);
    const [favoriteStates, setFavoriteStates] = useState<
        Record<string, boolean>
    >({});

    const cartToShow = user ? userCart ?? [] : localCart;

    const deleteCartItemMutation = useDeleteCartItemFromUser();
    const addToFavoriteMutation = useAddFavorite();
    const deleteFromFavoriteMutation = useDeleteFavorite();

    const totalPrice = cartToShow.reduce((total, item) => {
        if (!item.product) return total;
        return total + item.product.price * item.quantity;
    }, 0);

    const getLocalCart = (): ICartItem[] => {
        try {
            const localCart = localStorage.getItem("cart");
            return localCart ? JSON.parse(localCart) : [];
        } catch (error) {
            console.error("Помилка при читанні localStorage:", error);
            return [];
        }
    };

    const saveCartItemsToStorage = (localCart: ICartItem[]) => {
        try {
            localStorage.setItem("cart", JSON.stringify(localCart));
        } catch (error) {
            console.error("Помилка при збереженні в localStorage:", error);
        }
    };

    const removeItemFromLocalCart = (productId: string) => {
        const updatedCart: ICartItem[] = localCart.filter(
            (item: ICartItem) => item.productId !== productId
        );
        setLocalCart(updatedCart);
        saveCartItemsToStorage(updatedCart);
    };

    const removeCartItemFromServer = async (cartItemId: string) => {
        try {
            await deleteCartItemMutation.mutateAsync(cartItemId);
            console.log("Видалено з серверного кошика:", cartItemId);
        } catch (error) {
            console.error("Помилка видалення:", error);
        }
    };

    const checkIfFavorite = (productId: string): boolean => {
        if (user) {
            return (
                user.favorites?.some((item) => item.productId === productId) ||
                false
            );
        } else {
            try {
                const favorites = localStorage.getItem("favorites");
                const parsedFavorites: ILocalFavoriteItem[] = favorites
                    ? JSON.parse(favorites)
                    : [];
                return parsedFavorites.some(
                    (item) => item.product.id === productId
                );
            } catch (error) {
                console.error(
                    "Помилка при читанні favorites з localStorage:",
                    error
                );
                return false;
            }
        }
    };

    const handleFavoriteToggle = async (product: IProduct) => {
        const productId = product.id;
        const currentFavoriteState = favoriteStates[productId] || false;
        const newFavoriteState = !currentFavoriteState;

        setFavoriteStates((prev) => ({
            ...prev,
            [productId]: newFavoriteState,
        }));

        if (user) {
            try {
                if (newFavoriteState) {
                    await addToFavoriteMutation.mutateAsync(productId);
                } else {
                    await deleteFromFavoriteMutation.mutateAsync(productId);
                }
            } catch (error) {
                console.error("Помилка при роботі з вподобаними:", error);
                setFavoriteStates((prev) => ({
                    ...prev,
                    [productId]: currentFavoriteState,
                }));
            }
        } else {
            try {
                const favorites = localStorage.getItem("favorites");
                const parsed: ILocalFavoriteItem[] = favorites
                    ? JSON.parse(favorites)
                    : [];

                const updated = newFavoriteState
                    ? [...parsed, { productId, product }]
                    : parsed.filter(
                          (favItem) => favItem.productId !== productId
                      );

                localStorage.setItem("favorites", JSON.stringify(updated));
            } catch (error) {
                console.error("Помилка при збереженні у localStorage:", error);
                setFavoriteStates((prev) => ({
                    ...prev,
                    [productId]: currentFavoriteState,
                }));
            }
        }
    };

    useEffect(() => {
        if (!user && !isUserPending) {
            const localCartData = getLocalCart();
            setLocalCart(localCartData);
            setIsLocalCartLoaded(true);
        } else if (user) {
            setIsLocalCartLoaded(true);
        }
    }, [user, isUserPending]);

    useEffect(() => {
        if (cartToShow.length > 0) {
            const initialFavoriteStates: Record<string, boolean> = {};
            cartToShow.forEach((item) => {
                if (item.product) {
                    initialFavoriteStates[item.product.id] = checkIfFavorite(
                        item.product.id
                    );
                }
            });
            setFavoriteStates(initialFavoriteStates);
        }
    }, [cartToShow, user]);
    return (
        <>
            {cartToShow && cartToShow.length > 0 ? (
                <div className="flex justify-between gap-[15px] w-full px-[30px]">
                    <div className="flex flex-col gap-[15px] w-2/3 max-h-[80vh] overflow-y-auto">
                        {cartToShow.map((item) => {
                            const isServer = !!user;

                            const handleRemove = () => {
                                if (isServer) {
                                    removeCartItemFromServer(item.id!);
                                } else {
                                    removeItemFromLocalCart(item.productId);
                                }
                            };

                            const isFavorite = item.product
                                ? favoriteStates[item.product.id] || false
                                : false;

                            return (
                                <CartItem
                                    key={item.id ?? item.productId}
                                    item={item}
                                    handleRemove={handleRemove}
                                    handleFavoriteToggle={handleFavoriteToggle}
                                    isFavorite={isFavorite}
                                />
                            );
                        })}
                    </div>
                    <CartReceip totalPrice={totalPrice} />
                </div>
            ) : isUserCartPending || !isLocalCartLoaded ? (
                <UserCartSkeleton />
            ) : user && isUserCartError ? (
                <ErrorWithMessage message="Виникла помилка під час завантаження кошику" />
            ) : (
                <div className="flex flex-col justify-center text-center items-center p-[30px] sm:p-[10px] sm:pb-[150px]">
                    <Image
                        src="/images/emptycart.png"
                        alt={"1"}
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
            )}
        </>
    );
}

export default CartContent;
