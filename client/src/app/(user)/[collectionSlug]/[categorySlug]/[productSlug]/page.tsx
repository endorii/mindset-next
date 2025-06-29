"use client";

import { usePathname } from "next/navigation";
import HeartIcon from "@/components/Icons/HeartIcon";
import { useProduct } from "@/lib/hooks/useProducts";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/lib/hooks/useUsers";
import { useAddFavorite, useDeleteFavorite } from "@/lib/hooks/useFavorites";
import {
    useAddCartItemToUser,
    useDeleteCartItemFromUser,
} from "@/lib/hooks/useCart";
import { ICartItem } from "@/types/cart/cart.types";
import {
    IFavoriteItem,
    ILocalFavoriteItem,
} from "@/types/favorite/favorite.types";
import BasicInput from "@/components/ui/inputs/BasicInput";
import { number } from "motion";

export default function ProductPage() {
    const pathname = usePathname();
    const [collectionPath, categoryPath, productPath] = pathname
        .split("/")
        .filter(Boolean);

    const { data: user } = useCurrentUser();
    const { data: product, isLoading } = useProduct(
        collectionPath,
        categoryPath,
        productPath
    );

    const [chosenSize, setChosenSize] = useState("");
    const [chosenType, setChosenType] = useState("");
    const [chosenColor, setChosenColor] = useState("");
    const [quantity, setQuantity] = useState<number>(1);
    const [liked, setLiked] = useState(false);
    const [alreadyInCart, setAlreadyInCart] = useState(false);

    const addToFavorite = useAddFavorite();
    const deleteFromFavorite = useDeleteFavorite();
    const addCartItemToUser = useAddCartItemToUser();
    const deleteCartItem = useDeleteCartItemFromUser();

    useEffect(() => {
        setChosenSize(product?.productSizes[0].size.name || "");
        setChosenType(product?.productTypes[0].type.name || "");
        setChosenColor(product?.productColors[0].color.name || "");

        if (!product) return;

        if (user) {
            const isFavorite = user.favorites?.some(
                (item) => item.productId === product.id
            );
            const isInCart = user.cart?.some(
                (item) => item.productId === product.id
            );
            setLiked(!!isFavorite);
            setAlreadyInCart(!!isInCart);
        } else {
            const favorites = localStorage.getItem("favorites");
            const parsedFavorites: ILocalFavoriteItem[] = favorites
                ? JSON.parse(favorites)
                : [];
            const isFav = parsedFavorites.some(
                (item) => item.product.id === product.id
            );
            setLiked(isFav);

            const cart = localStorage.getItem("cart");
            const parsedCart: ICartItem[] = cart ? JSON.parse(cart) : [];
            const isCart = parsedCart.some(
                (item) => item.productId === product.id
            );
            setAlreadyInCart(isCart);
        }
    }, [product]);

    const handleLikeToggle = async () => {
        if (!product) return;
        const newLiked = !liked;
        setLiked(newLiked);

        const dataToSend: IFavoriteItem = {
            size: chosenSize,
            type: chosenType,
            color: chosenColor,
            product,
            productId: product.id,
        };

        if (user) {
            if (newLiked) {
                addToFavorite.mutate({
                    userId: user.id,
                    favoriteItem: dataToSend,
                });
            } else {
                deleteFromFavorite.mutate({
                    userId: user.id,
                    productId: product.id,
                });
            }
        } else {
            const favorites = localStorage.getItem("favorites");
            const parsed: ILocalFavoriteItem[] = favorites
                ? JSON.parse(favorites)
                : [];
            const updated = newLiked
                ? [...parsed, dataToSend]
                : parsed.filter((item) => item.product.id !== product.id);
            localStorage.setItem("favorites", JSON.stringify(updated));
        }
    };

    const handleCartToggle = async () => {
        if (!product) return;
        const newCartState = !alreadyInCart;
        setAlreadyInCart(newCartState);

        const dataToSend: ICartItem = {
            size: chosenSize,
            type: chosenType,
            color: chosenColor,
            quantity,
            product,
            productId: product.id,
        };

        if (user) {
            if (newCartState) {
                addCartItemToUser.mutate({
                    userId: user.id,
                    cartItem: dataToSend,
                });
            } else {
                deleteCartItem.mutate({
                    userId: user.id,
                    productId: product.id,
                });
            }
        } else {
            const cart = localStorage.getItem("cart");
            const parsed: ICartItem[] = cart ? JSON.parse(cart) : [];
            const updated = newCartState
                ? [...parsed, dataToSend]
                : parsed.filter((item) => item.productId !== product.id);
            localStorage.setItem("cart", JSON.stringify(updated));
        }
    };

    const checkQuantity = (quantity: number) => {
        if (quantity < 1) {
            return 1;
        } else {
            return quantity;
        }
    };

    if (isLoading || !product) {
        return (
            <div className="pt-[130px] text-center text-[50px]">
                {isLoading ? "Завантаження..." : "Товар не знайдено 😞"}
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row mt-[30px] gap-[50px] items-start">
            <div className="flex gap-[10px] relative">
                <div className="relative">
                    <button
                        onClick={handleLikeToggle}
                        className="absolute top-1 right-1 m-[0_auto] text-xs flex justify-center items-center gap-[10px] p-[10px] transition-all duration-300 cursor-pointer w-[60px] h-[60px]"
                    >
                        <HeartIcon
                            className={`transition-all duration-300 ${
                                liked
                                    ? "w-[42px] stroke-white fill-white"
                                    : "w-[35px] stroke-white stroke-[1.5] fill-none"
                            }`}
                        />
                    </button>
                    <img
                        src={`http://localhost:5000/${product.banner}`}
                        alt={product.name}
                        className="max-w-[600px]"
                    />
                </div>
                <ul className="flex flex-col w-[150px] gap-[10px] overflow-y-auto max-h-[600px]">
                    {product.images?.map((image, i) => (
                        <li key={i}>
                            <img
                                src={`http://localhost:5000/${image}`}
                                alt={product.name}
                                className="w-full h-auto"
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-[15px] w-full">
                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <div className="text-3xl font-semibold text-gray-800">
                        {product.price} грн.
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    {product.category?.collection?.name} /{" "}
                    {product.category?.name}
                </div>

                <div className="mt-[20px] text-gray-700">
                    {product.description}
                </div>
                <hr className="w-full border-gray-200" />
                <div className="text-gray-600">{product.composition}</div>

                <div
                    className={`text-sm ${
                        product.available ? "text-green-600" : "text-gray-500"
                    }`}
                >
                    {product.available ? "В наявності" : "Немає в наявності"}
                </div>

                {product.productColors.length > 0 && (
                    <div className="flex flex-col gap-[10px] mt-[10px]">
                        <div>Колір:</div>
                        <ul className="flex gap-[10px]">
                            {product.productColors.map((item, i) => (
                                <li
                                    key={i}
                                    className={`px-[15px] py-[8px] border ${
                                        chosenColor === item.color.name
                                            ? "border-black"
                                            : "border-gray-200"
                                    } hover:border-black cursor-pointer`}
                                    onClick={() =>
                                        setChosenColor(item.color.name)
                                    }
                                >
                                    {item.color.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {product.productTypes.length > 0 && (
                    <div className="flex flex-col gap-[10px] mt-[10px]">
                        <div>Тип:</div>
                        <ul className="flex gap-[10px]">
                            {product.productTypes.map((item, i) => (
                                <li
                                    key={i}
                                    className={`px-[15px] py-[8px] border ${
                                        chosenType === item.type.name
                                            ? "border-black"
                                            : "border-gray-200"
                                    } hover:border-black cursor-pointer`}
                                    onClick={() =>
                                        setChosenType(item.type.name)
                                    }
                                >
                                    {item.type.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {product.productSizes.length > 0 && (
                    <div className="flex flex-col gap-[10px] mt-[10px]">
                        <div>Розмір:</div>
                        <ul className="flex gap-[10px]">
                            {product.productSizes.map((item, i) => (
                                <li
                                    key={i}
                                    className={`px-[15px] py-[8px] border ${
                                        chosenSize === item.size.name
                                            ? "border-black"
                                            : "border-gray-200"
                                    } hover:border-black cursor-pointer`}
                                    onClick={() =>
                                        setChosenSize(item.size.name)
                                    }
                                >
                                    {item.size.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="relative flex flex-col gap-[4px]">
                    <label className="text-gray-600">Кількість</label>
                    <BasicInput
                        type="number"
                        value={quantity}
                        onChangeValue={(e) =>
                            setQuantity(checkQuantity(+e.target.value))
                        }
                    />
                </div>

                <div className="flex justify-between gap-[15px] mt-[30px]">
                    <button
                        disabled={!product.available}
                        className="w-full border border-transparent hover:border-black hover:bg-white hover:text-black bg-black text-white px-[15px] py-[12px] transition-all duration-300 cursor-pointer disabled:bg-gray-200"
                    >
                        Купити
                    </button>
                    <button
                        onClick={handleCartToggle}
                        disabled={
                            !product.available ||
                            !chosenColor ||
                            !chosenSize ||
                            !chosenType ||
                            quantity < 1
                        }
                        className={`w-full border px-[15px] py-[12px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 ${
                            alreadyInCart
                                ? "border-black hover:bg-black hover:text-white bg-white text-black"
                                : "border-transparent hover:border-black hover:bg-white hover:text-black bg-black text-white"
                        }`}
                    >
                        {alreadyInCart ? "Видалити з кошика" : "В кошик"}
                    </button>
                </div>
            </div>
        </div>
    );
}
