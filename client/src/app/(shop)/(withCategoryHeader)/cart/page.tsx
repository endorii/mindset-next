"use client";

import { useDeleteCartItemFromUser } from "@/features/cart/hooks/useCart";
import { ICartItem } from "@/features/cart/types/cart.types";
import {
    useAddFavorite,
    useDeleteFavorite,
} from "@/features/favorites/hooks/useFavorites";
import {
    ILocalFavoriteItem,
    IFavoriteItem,
} from "@/features/favorites/types/favorites.types";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { CloseIcon, HeartIcon } from "@/shared/icons";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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
            <div className="flex justify-center items-center">
                <div className="text-white text-center mt-[150px] text-[24px] uppercase font-bold rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[30px] py-[15px]">
                    {user
                        ? "У вас поки немає товарів у кошику"
                        : "Кошик порожній"}
                </div>
            </div>
        );
    }

    return (
        <div className="relative py-[50px] text-white">
            {/* <h3 className="text-xl font-bold text-center text-white text-[200px] leading-[270px]">
                Кошик:
            </h3> */}
            <div className="flex justify-between">
                <ul className=" flex flex-col gap-[30px] w-[70%] max-h-[80vh] overflow-y-auto">
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
                                className="border-b pb-[30px] rounded-xl bg-white/5 backdrop-blur-[100px] border border-white/5 p-[20px] "
                            >
                                <Link
                                    href={`${product.category?.collection?.path}/${product.category?.path}/${product.path}`}
                                    className="flex"
                                >
                                    <Image
                                        src={`http://localhost:5000/${product.banner}`}
                                        alt={product.name}
                                        width={300}
                                        height={300}
                                        className="rounded-xl"
                                    />
                                    <div className="px-[30px] flex flex-col justify-between w-full ">
                                        <div className="flex flex-col justify-between">
                                            <div className="flex items-center justify-between mb-[15px]">
                                                <div className="text-[30px] font-thin">
                                                    {product.name}
                                                </div>
                                                <div className="text-lg font-bold">
                                                    {product.price} грн.
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-[7px] text-white/60">
                                                <div className="flex gap-[7px] items-center">
                                                    <div className="text-sm">
                                                        Колір:{" "}
                                                    </div>
                                                    <div className="text-sm rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[10px] py-[3px]">
                                                        {item.color}
                                                    </div>
                                                </div>
                                                <div className="flex gap-[7px] items-center">
                                                    <div className="text-sm">
                                                        Розмір:{" "}
                                                    </div>
                                                    <div className="text-sm rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[10px] py-[3px]">
                                                        {item.size}
                                                    </div>
                                                </div>
                                                <div className="flex gap-[7px] items-center">
                                                    <div className="text-sm">
                                                        Тип:{" "}
                                                    </div>
                                                    <div className="text-sm rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[10px] py-[3px]">
                                                        {item.type}
                                                    </div>
                                                </div>
                                                <div className="flex gap-[7px] items-center">
                                                    <div className="text-sm">
                                                        Кількість:{" "}
                                                    </div>
                                                    <div className="text-sm rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[10px] py-[3px]">
                                                        {item.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="border-t border-white/10" />
                                        <div className="flex justify-between gap-[10px]">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleRemove();
                                                }}
                                                className="flex justify-center gap-[10px] text-white bg-transparent px-[15px] py-[15px] rounded-xl font-bold border border-white/15 cursor-pointer w-full disabled:cursor-not-allowed"
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
                                                className={`flex justify-center gap-[10px] text-white bg-transparent px-[15px] py-[15px] rounded-xl font-bold border border-white/15 cursor-pointer w-full `}
                                            >
                                                <HeartIcon
                                                    className={`w-[22px] transition-all duration-300 stroke-white fill-none`}
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
                <div className="w-[27%] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] text-lg">
                    <div className="font-bold">Всього</div>
                    <hr className="border-t border-white/10 my-[15px]" />
                    <div className="flex flex-col gap-[15px]">
                        <div className="flex justify-between">
                            <div>Сума товарів:</div>
                            <div>{totalPrice.toFixed(2)} грн</div>
                        </div>
                        <div className="flex justify-between text-white/50 text-base">
                            <div>Сума знижки:</div>
                            <div>0 грн</div>
                        </div>
                        <div className="flex justify-between text-white/50 text-base">
                            <div>Доставка:</div>
                            <div>0 грн</div>
                        </div>
                        <div className="flex justify-between font-bold mt-[25px]">
                            <div>До сплати:</div>
                            <div>{totalPrice.toFixed(2)} грн</div>
                        </div>
                    </div>

                    <button className="flex justify-center gap-[10px] text-white bg-transparent px-[15px] py-[15px] rounded-xl font-bold border mt-[50px] border-white/15 cursor-pointer w-full disabled:cursor-not-allowed text-base">
                        Купити
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
