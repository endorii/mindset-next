"use client";

import Link from "next/link";
import CloseIcon from "@/components/Icons/CloseIcon";
import HeartIcon from "@/components/Icons/HeartIcon";
import { useCurrentUser } from "@/lib/hooks/useUsers";
import { ICartItem } from "@/types/cart/cart.types";
import {
    IFavoriteItem,
    ILocalFavoriteItem,
} from "@/types/favorite/favorite.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDeleteCartItemFromUser } from "@/lib/hooks/useCart";
import { useAddFavorite, useDeleteFavorite } from "@/lib/hooks/useFavorites";

function Cart() {
    const { data: user, isLoading } = useCurrentUser();

    const [localCart, setLocalCart] = useState<ICartItem[]>([]);
    const [isLocalCartLoaded, setIsLocalCartLoaded] = useState(false);
    const [favoriteStates, setFavoriteStates] = useState<
        Record<string, boolean>
    >({});

    const serverCart: ICartItem[] = user?.cart || [];
    const cartToShow = user ? serverCart : localCart;

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

    if (!cartToShow || cartToShow.length === 0) {
        return (
            <div className="pt-[30px] text-center text-[50px]">
                {user ? "У вас поки немає товарів у кошику" : "Кошик порожній"}
            </div>
        );
    }

    return (
        <div>
            <h3 className="mt-[30px] text-xl uppercase font-bold">Кошик:</h3>
            <div className="flex justify-between">
                <ul className="mt-[30px] flex flex-col gap-[30px] w-[70%] max-h-[90vh] overflow-y-scroll">
                    {cartToShow.map((item) => {
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

                        const isFavorite = favoriteStates[product.id] || false;

                        return (
                            <li
                                key={item.product.id}
                                className="border-b pb-[30px] border-gray-200"
                            >
                                <Link
                                    href={`${product.category?.collection?.path}/${product.category?.path}/${product.path}`}
                                    className="flex"
                                >
                                    <Image
                                        src={`http://localhost:5000/${product.banner}`}
                                        alt={product.name}
                                        width={250}
                                        height={250}
                                    />
                                    <div className="px-[30px] flex flex-col justify-between w-full">
                                        <div className="flex flex-col justify-between">
                                            <div className="flex items-center justify-between mb-[15px]">
                                                <div className="text-lg font-medium">
                                                    {product.name}
                                                </div>
                                                <div className="text-lg font-bold">
                                                    {product.price} грн.
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">
                                                    Розмір: {item.size}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Кількість: {item.quantity}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Колір: {item.color}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Тип: {item.type}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between gap-[10px]">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleRemove();
                                                }}
                                                className="group flex text-xs items-center gap-[20px] w-full border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white px-[20px] py-[7px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed"
                                            >
                                                <CloseIcon className="w-[20px] stroke-white group-hover:stroke-black transition-all duration-300" />
                                                <div>Видалити</div>
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleFavoriteToggle(item);
                                                }}
                                                className={`group flex text-xs items-center gap-[20px] w-full border transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed px-[20px] py-[7px] ${
                                                    isFavorite
                                                        ? "border-black-500 bg-white text-black"
                                                        : "border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white"
                                                }`}
                                            >
                                                <HeartIcon
                                                    className={`w-[22px] transition-all duration-300 ${
                                                        isFavorite
                                                            ? "stroke-black fill-none group-hover:fill-black"
                                                            : "stroke-white group-hover:stroke-black"
                                                    }`}
                                                />
                                                <div>
                                                    {isFavorite
                                                        ? "Видалити з Вподобаного"
                                                        : "Додати до Вподобаного"}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="w-[27%] bg-gray-100 p-[30px]">
                    <div className="font-bold">Всього</div>
                    <hr className="my-[15px] border-b border-gray-200" />
                    <div className="flex flex-col gap-[15px]">
                        <div className="flex justify-between">
                            <div>Сума товарів:</div>
                            <div>{totalPrice.toFixed(2)} грн</div>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <div>Сума знижки:</div>
                            <div>0 грн</div>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <div>Доставка:</div>
                            <div>0 грн</div>
                        </div>
                        <div className="flex justify-between font-bold mt-[25px]">
                            <div>До сплати:</div>
                            <div>{totalPrice.toFixed(2)} грн</div>
                        </div>
                    </div>

                    <button className="w-full border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white px-[20px] py-[15px] mt-[30px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed">
                        Купити
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
