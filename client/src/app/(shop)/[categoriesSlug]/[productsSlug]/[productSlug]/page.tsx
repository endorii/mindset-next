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
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import AttributeSelector from "@/features/products/components/AttributeSelector";
import QuantitySelector from "@/shared/ui/selectors/QuantitySelector";
import { div } from "motion/react-client";
import ReviewsOnProductPage from "@/features/reviews/components/ReviewsOnProductPage";

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

    if (isLoading || !product) {
        return (
            <div className="pt-[130px] text-center text-[50px]">
                {isLoading ? "Завантаження..." : "Товар не знайдено 😞"}
            </div>
        );
    }

    return (
        <div className="flex flex-col px-[30px] py-[10px] gap-[30px]">
            <div className="flex flex-col md:flex-row gap-[20px] items-start text-white h-full w-full">
                <div className="flex gap-[10px] relative rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 min-w-fit max-w-[55%]">
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
                            className="w-full rounded-xl"
                        />
                    </div>
                    {product.images.length > 0 ? (
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
                    ) : (
                        ""
                    )}
                </div>

                <div className="flex flex-col gap-[15px] min-w-[45%] w-full h-full">
                    <div className="flex flex-col gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[40px] py-[20px]">
                        <div className="text-sm font-light text-white/30">
                            {product.category?.collection?.name} /{" "}
                            {product.category?.name}
                        </div>

                        <h3 className="text-5xl font-bold">{product.name}</h3>

                        <div className="flex gap-[20px] items-center mt-[10px]">
                            <div className="flex gap-[10px] items-center">
                                <div className="text-xl font-semibold">
                                    {product.price} грн.
                                </div>
                                <div className="text-lg line-through text-gray-400 font-light">
                                    {product.oldPrice} грн.
                                </div>
                            </div>
                        </div>
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

                        <div className="mt-[20px] text-white/80 break-words">
                            {product.description}
                        </div>
                        <hr className="w-full border-white/10 border-t " />
                        <div className="text-white/80 break-words">
                            {product.composition}
                        </div>

                        <div className="flex flex-col gap-[35px] mt-[30px]">
                            {product.productColors.length > 0 && (
                                <div className="flex items-center gap-[30px]">
                                    <div>Колір:</div>
                                    <ul className="flex gap-[10px]">
                                        {product.productColors.map(
                                            (item, i) => (
                                                <li
                                                    key={i}
                                                    onClick={() =>
                                                        setChosenColor(
                                                            item.color.name
                                                        )
                                                    }
                                                >
                                                    <button
                                                        className={`w-[25px] h-[25px] rounded-full border border-transparent  hover:border-white/20 cursor-pointer ${
                                                            chosenColor ===
                                                            item.color.name
                                                                ? " border-white/100"
                                                                : "border-black"
                                                        }`}
                                                        style={{
                                                            backgroundColor:
                                                                item.color
                                                                    .hexCode,
                                                        }}
                                                    ></button>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <div className="flex gap-[10px] items-center">
                                        <div className="text-xs text-white/40">
                                            Обраний колір:{" "}
                                        </div>
                                        <div>{chosenColor}</div>
                                    </div>
                                </div>
                            )}
                            <AttributeSelector
                                attributeItems={product.productTypes}
                                label="Тип"
                                getName={(item) => item.type.name}
                                chosenValue={chosenType}
                                setFunction={setChosenType}
                            />
                            <AttributeSelector
                                attributeItems={product.productSizes}
                                label="Розмір"
                                getName={(item) => item.size.name}
                                chosenValue={chosenSize}
                                setFunction={setChosenSize}
                            />

                            <QuantitySelector
                                quantity={quantity}
                                setQuantity={setQuantity}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between gap-[10px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[10px]">
                        <MonoButton
                            onClick={handleCartToggle}
                            className={`w-full h-[50px] ${
                                alreadyInCart
                                    ? "bg-black text-white"
                                    : "bg-white text-black"
                            }`}
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
                        <MonoButton
                            onClick={handleLikeToggle}
                            className={`w-full h-[50px] `}
                            disabled={
                                !product.available ||
                                !chosenColor ||
                                !chosenSize ||
                                !chosenType ||
                                quantity < 1
                            }
                        >
                            {liked ? "Видалити з вподобаного" : "В вподобане"}
                        </MonoButton>
                    </div>
                </div>
            </div>
            <ReviewsOnProductPage />
        </div>
    );
}
