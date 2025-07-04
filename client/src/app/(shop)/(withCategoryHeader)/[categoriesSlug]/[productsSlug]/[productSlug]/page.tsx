"use client";

import {
    useAddCartItemToUser,
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
import { useProduct } from "@/features/products/hooks/useProducts";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { HeartIcon } from "@/shared/icons";
import BasicInput from "@/shared/ui/inputs/BasicInput";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";

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
        setChosenSize(product?.productSizes[0]?.size.name || "");
        setChosenType(product?.productTypes[0]?.type.name || "");
        setChosenColor(product?.productColors[0]?.color.name || "");

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
        <div className="flex flex-col md:flex-row gap-[20px] items-start text-white min-h-[45vw]">
            <div className="flex gap-[10px] relative rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="relative">
                    <button
                        onClick={handleLikeToggle}
                        className="absolute group top-[10px] right-[10px] m-[0_auto] text-xs flex justify-center items-center gap-[10px] transition-all duration-300 cursor-pointer min-w-[60px] w-[60px] min-h-[60px] h-[60px] rounded-xl bg-black/30 hover:bg-black/40 shadow-lg backdrop-blur-[100px] border border-black/5 p-[10px]"
                    >
                        <HeartIcon
                            className={`group-hover:fill-white transition-all duration-300 ${
                                liked
                                    ? "w-[42px] stroke-white fill-white"
                                    : "w-[35px] stroke-white stroke-[1.5] fill-none"
                            }`}
                        />
                    </button>
                    <img
                        src={`http://localhost:5000/${product.banner}`}
                        alt={product.name}
                        className="max-w-[745px] rounded-xl"
                    />
                </div>
                <ul className="flex flex-col w-[150px] gap-[10px] overflow-y-auto max-h-[600px]">
                    {product.images?.map((image, i) => (
                        <li key={i}>
                            <img
                                src={`http://localhost:5000/${image}`}
                                alt={product.name}
                                className="w-full h-auto rounded-xl"
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-[15px] w-full h-full">
                <div className="flex flex-col gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="flex justify-between">
                        <h3 className="text-5xl font-thin">{product.name}</h3>
                        <div className="text-3xl font-semibold rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[20px] py-[15px]">
                            {product.price} грн.
                        </div>
                    </div>
                    <div className="text-sm text-gray-400">
                        {product.category?.collection?.name} /{" "}
                        {product.category?.name}
                    </div>
                    <div className="mt-[20px] text-gray-300">
                        {product.description}
                    </div>
                    <hr className="w-full border-white/10 border-t" />
                    <div className="text-gray-300">{product.composition}</div>
                    <div
                        className={`text-sm ${
                            product.available
                                ? "text-green-600"
                                : "text-red-500"
                        }`}
                    >
                        {product.available
                            ? "В наявності"
                            : "Немає в наявності"}
                    </div>
                    {product.productColors.length > 0 && (
                        <div className="flex flex-col gap-[10px] mt-[10px]">
                            <div>Колір:</div>
                            <ul className="flex gap-[10px]">
                                {product.productColors.map((item, i) => (
                                    <li
                                        key={i}
                                        className={`px-[15px] py-[8px] border border-white/10 rounded-xl hover:border-white/20 cursor-pointer ${
                                            chosenColor === item.color.name
                                                ? "bg-white text-black"
                                                : "border-gray-200"
                                        }`}
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
                                        className={`px-[15px] py-[8px] border border-white/10 rounded-xl hover:border-white/20 cursor-pointer ${
                                            chosenType === item.type.name
                                                ? "bg-white text-black"
                                                : "border-gray-200"
                                        } `}
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
                                        className={`px-[15px] py-[8px] border border-white/10 rounded-xl hover:border-white/20 cursor-pointer ${
                                            chosenSize === item.size.name
                                                ? "bg-white text-black"
                                                : "border-gray-200"
                                        }`}
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

                    {/* зробити нормально */}

                    <div className="relative flex flex-col gap-[4px] mt-[5px]">
                        <label className="text-white">Кількість</label>
                        <BasicInput
                            type="number"
                            value={quantity}
                            onChangeValue={(e) =>
                                setQuantity(checkQuantity(+e.target.value))
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-between gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[10px]">
                    <MonoButton disabled={!product.available}>
                        Купити
                    </MonoButton>
                    <MonoButton
                        onClick={handleCartToggle}
                        disabled={
                            !product.available ||
                            !chosenColor ||
                            !chosenSize ||
                            !chosenType ||
                            quantity < 1
                        }
                    >
                        {alreadyInCart ? "Видалити з кошика" : "В кошик"}
                    </MonoButton>
                </div>
            </div>
        </div>
    );
}
