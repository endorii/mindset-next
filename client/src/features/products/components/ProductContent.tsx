"use client";

import { useAddCartItemToUser } from "@/features/shop/cart/hooks/useCart";
import {
    useAddFavorite,
    useDeleteFavorite,
} from "@/features/shop/favorites/hooks/useFavorites";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { HeartIcon } from "@/shared/icons";
import { MonoButton } from "@/shared/ui/buttons";
import { Breadcrumbs } from "@/shared/ui/components";
import addToRecentlyViewed from "@/shared/utils/addToRecentlyViewed";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IProduct } from "../types/products.types";
import AttributeSelector from "./AttributeSelector";

interface ProductContentProps {
    collectionPath: string;
    categoryPath: string;
    productPath: string;
    product: IProduct;
}

function ProductContent({
    collectionPath,
    categoryPath,
    productPath,
    product,
}: ProductContentProps) {
    const { data: user, isPending: isUserPending } = useCurrentUser();

    // Zustand stores
    const { addToCart: addToLocalCart } = useCartStore();
    const { isInFavorites, toggleFavorite: toggleLocalFavorite } =
        useFavoritesStore();

    // Backend mutations
    const addToFavoriteMutation = useAddFavorite();
    const deleteFromFavoriteMutation = useDeleteFavorite();
    const addCartItemToUserMutation = useAddCartItemToUser();

    // Local state
    const [chosenSize, setChosenSize] = useState("");
    const [chosenType, setChosenType] = useState("");
    const [chosenColor, setChosenColor] = useState("");
    const [quantity, setQuantity] = useState<number>(1);

    // Ініціалізація атрибутів і recently viewed
    useEffect(() => {
        if (!product) return;

        setChosenSize(product?.productSizes[0]?.size.name || "");
        setChosenType(product?.productTypes[0]?.type.name || "");
        setChosenColor(product?.productColors[0]?.color.name || "");

        addToRecentlyViewed(product);
    }, [product]);

    // Перевірка чи товар в favorites (локально або на сервері)
    const isLiked =
        user && !isUserPending
            ? user.favorites?.some((item) => item.productId === product.id)
            : isInFavorites(product.id);

    // Toggle favorites
    const handleLikeToggle = async () => {
        if (!product) return;

        if (user && !isUserPending) {
            // Backend логіка
            if (isLiked) {
                deleteFromFavoriteMutation.mutate(product.id);
            } else {
                addToFavoriteMutation.mutate(product.id);
            }
        } else {
            // LocalStorage через Zustand
            toggleLocalFavorite(product.id);
            toast.success(
                isLiked ? "Видалено з вподобаних" : "Додано до вподобаних"
            );
        }
    };

    // Додати в корзину
    const handleAddToCart = async () => {
        if (!product) return;

        if (user && !isUserPending) {
            // Backend логіка
            addCartItemToUserMutation.mutate({
                size: chosenSize,
                type: chosenType,
                color: chosenColor,
                quantity,
                // product,
                productId: product.id,
            });
        } else {
            // LocalStorage через Zustand
            addToLocalCart(
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.banner,
                },
                chosenSize,
                chosenColor
            );
            toast.success("Додано в корзину");
        }
    };

    return (
        <div className="flex lg:flex-col gap-[15px] items-start text-white">
            <div className="flex xl:flex-col gap-[10px] relative rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 max-h-[80vh] xl:max-h-[90vh] xl:w-full w-[55%]">
                <div className="relative w-[85%] xl:w-full">
                    <button
                        onClick={handleLikeToggle}
                        className="absolute group top-[10px] right-[10px] m-[0_auto] text-xs flex justify-center items-center gap-[10px] transition-all duration-300 cursor-pointer min-w-[60px] w-[60px] min-h-[60px] h-[60px] rounded-xl bg-black/30 hover:bg-black/40 shadow-lg backdrop-blur-[100px] border border-black/5 p-[10px]"
                    >
                        <HeartIcon
                            className={`group-hover:fill-white transition-all duration-300 ${
                                isLiked
                                    ? "w-[42px] stroke-white fill-white"
                                    : "w-[35px] stroke-white stroke-[1.5] fill-none"
                            }`}
                        />
                    </button>
                    <img
                        src={`http://localhost:5000/${product.banner}`}
                        alt={product.name}
                        className="rounded-xl w-full h-[80vh] xl:max-h-[70vh] object-cover"
                    />
                </div>
                {product.images.length > 0 && (
                    <div className="flex flex-col xl:flex-row gap-[10px] w-[15%] xl:w-full xl:h-[150px] overflow-y-auto xl:overflow-x-auto">
                        {product.images.map((image, i) => (
                            <img
                                key={i}
                                src={`http://localhost:5000/${image}`}
                                alt={product.name}
                                className="rounded-xl"
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-[15px] w-[45%] lg:w-full">
                <div className="flex flex-col gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[40px] xl:p-[15px] py-[20px]">
                    <Breadcrumbs
                        collectionPath={collectionPath}
                        categoryPath={categoryPath}
                        productPath={productPath}
                    />

                    <h3 className="text-5xl 2xl:text-4xl font-bold">
                        {product.name}
                    </h3>

                    <div className="flex gap-[15px] items-center mt-[10px]">
                        <div className="flex gap-[10px] items-center">
                            <div className="text-xl font-semibold">
                                {product.price} грн.
                            </div>
                            {product.oldPrice && (
                                <div className="text-lg line-through text-white/60 font-light">
                                    {product.oldPrice} грн.
                                </div>
                            )}
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

                    <div className="mt-[20px] xl:mt-[10px] text-sm text-white/80 break-words">
                        {product.description}
                    </div>
                    <hr className="w-full border-white/10 border-t" />
                    <div className="text-sm text-white/80 break-words">
                        {product.composition}
                    </div>

                    <div className="flex flex-col gap-[35px] mt-[30px] text-sm">
                        {product.productColors?.length > 0 && (
                            <div className="flex flex-wrap gap-[10px] items-center">
                                <div className="flex gap-[30px]">
                                    <div>Колір:</div>
                                    <ul className="flex flex-wrap gap-[10px]">
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
                                                        className={`w-[25px] h-[25px] rounded-full border border-transparent hover:border-white/20 cursor-pointer ${
                                                            chosenColor ===
                                                            item.color.name
                                                                ? "border-white/100"
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
                                </div>
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

                        <div className="relative flex gap-[30px] items-center">
                            <div>Кількість</div>
                            <div className="flex gap-[15px] items-center">
                                <button
                                    className="p-[7px] text-center border border-white/10 rounded-xl w-[40px] h-[40px] cursor-pointer bg-white/5 hover:bg-white/10 active:bg-white active:text-black transition-all duration-200"
                                    onClick={() =>
                                        setQuantity((prev) =>
                                            prev > 1 ? prev - 1 : prev
                                        )
                                    }
                                >
                                    -
                                </button>
                                <div>{quantity}</div>
                                <button
                                    className="p-[7px] text-center border border-white/10 rounded-xl w-[40px] h-[40px] cursor-pointer bg-white/5 hover:bg-white/10 active:bg-white active:text-black transition-all duration-200"
                                    onClick={() =>
                                        setQuantity((prev) => prev + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex md:flex-col justify-between gap-[10px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[10px]">
                    <MonoButton
                        onClick={handleAddToCart}
                        className="w-full h-[50px] bg-white text-black!"
                        disabled={
                            !product.available ||
                            !chosenColor ||
                            !chosenSize ||
                            !chosenType ||
                            quantity < 1
                        }
                    >
                        В кошик
                    </MonoButton>
                    <MonoButton
                        onClick={handleLikeToggle}
                        className="w-full h-[50px]"
                    >
                        {isLiked ? "Видалити з вподобаного" : "В вподобане"}
                    </MonoButton>
                </div>
            </div>
        </div>
    );
}

export default ProductContent;
