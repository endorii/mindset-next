"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import CartItem from "@/features/cart/components/CartItem";
import CartReceip from "@/features/cart/components/CartReceip";
import {
    useCartItemsFromUser,
    useDeleteCartItemFromUser,
} from "@/features/cart/hooks/useCart";
import { ICartItem } from "@/features/cart/types/cart.types";
import {
    useAddFavorite,
    useDeleteFavorite,
} from "@/features/favorites/hooks/useFavorites";
import {
    ILocalFavoriteItem,
    IFavoriteItem,
} from "@/features/favorites/types/favorites.types";
import { PopularProducts } from "@/shared/components";
import ShopTitle from "@/shared/ui/titles/ShopTitle";
import Image from "next/image";
import { useState, useEffect } from "react";

function Cart() {
    const { data: user, isLoading } = useCurrentUser();
    const { data: userCart } = useCartItemsFromUser(user?.id || "");

    const [localCart, setLocalCart] = useState<ICartItem[]>([]);
    const [isLocalCartLoaded, setIsLocalCartLoaded] = useState(false);
    const [favoriteStates, setFavoriteStates] = useState<
        Record<string, boolean>
    >({});

    const cartToShow = user ? userCart ?? [] : localCart;

    const deleteCartItem = useDeleteCartItemFromUser();
    const addToFavorite = useAddFavorite();
    const deleteFromFavorite = useDeleteFavorite();

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

    const removeCartItemFromServer = async (
        userId: string,
        productId: string
    ) => {
        try {
            await deleteCartItem.mutateAsync({ userId, productId });
            console.log("Видалено з серверного кошика:", productId);
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

    const handleFavoriteToggle = async (item: ICartItem) => {
        if (!item.product) return;

        const productId = item.product.id;
        const currentFavoriteState = favoriteStates[productId] || false;
        const newFavoriteState = !currentFavoriteState;

        setFavoriteStates((prev) => ({
            ...prev,
            [productId]: newFavoriteState,
        }));

        const dataToSend: IFavoriteItem = {
            size: item.size,
            type: item.type,
            color: item.color,
            product: item.product,
            productId: item.product.id,
        };

        if (user) {
            try {
                if (newFavoriteState) {
                    await addToFavorite.mutateAsync({
                        userId: user.id,
                        favoriteItem: dataToSend,
                    });
                } else {
                    await deleteFromFavorite.mutateAsync({
                        userId: user.id,
                        productId: item.product.id,
                    });
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
                    ? [...parsed, dataToSend]
                    : parsed.filter(
                          (favItem) => favItem.product.id !== item.product.id
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
        if (!user && !isLoading) {
            const localCartData = getLocalCart();
            setLocalCart(localCartData);
            setIsLocalCartLoaded(true);
        } else if (user) {
            setIsLocalCartLoaded(true);
        }
    }, [user, isLoading]);

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

    if (isLoading || !isLocalCartLoaded) {
        return <p>Завантаження кошика...</p>;
    }

    return (
        <div className="flex flex-col gap-[50px] mt-[10px] text-white">
            <ShopTitle title="Кошик" subtitle="Cart" />
            {cartToShow.length > 0 ? (
                <div className="flex justify-between gap-[20px] w-full px-[30px]">
                    <ul className=" flex flex-col gap-[20px] w-2/3 max-h-[80vh] overflow-y-auto">
                        {cartToShow.map((item, i) => {
                            const isServer = !!user;
                            const { product } = item;

                            if (!product) return null;

                            const handleRemove = () => {
                                if (isServer) {
                                    removeCartItemFromServer(
                                        user.id,
                                        item.product.id
                                    );
                                } else {
                                    removeItemFromLocalCart(item.productId);
                                }
                            };

                            const isFavorite =
                                favoriteStates[product.id] || false;

                            return (
                                <CartItem
                                    key={product.id}
                                    product={product}
                                    item={item}
                                    handleRemove={handleRemove}
                                    handleFavoriteToggle={handleFavoriteToggle}
                                    isFavorite={isFavorite}
                                />
                            );
                        })}
                    </ul>
                    <CartReceip totalPrice={totalPrice} />
                </div>
            ) : (
                <div className="flex flex-col justify-center text-center items-center p-[30px] sm:p-[10px] sm:pb-[150px]">
                    <Image
                        src="/images/emptycart.png"
                        alt={"1"}
                        width={300}
                        height={0}
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
            <PopularProducts />
        </div>
    );
}

export default Cart;
