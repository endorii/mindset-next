"use client";

import { useAddCartItemToUser } from "@/features/shop/cart/hooks/useCart";
import {
    useAddFavorite,
    useDeleteFavorite,
    useFavoritesFromUser,
} from "@/features/shop/favorites/hooks/useFavorites";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { HeartIcon } from "@/shared/icons";
import { MonoButton } from "@/shared/ui/buttons";
import { Breadcrumbs } from "@/shared/ui/components";
import { AttributeSelectorSkeleton } from "@/shared/ui/skeletons/AttributeSelectorSkeleton";
import { ColorSelectorSkeleton } from "@/shared/ui/skeletons/ColorSelectorSkeleton";
import { addToRecentlyViewed } from "@/shared/utils/addToRecentlyViewed";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    useProductColors,
    useProductSizes,
    useProductTypes,
} from "../hooks/useProducts";
import { IProduct } from "../types/products.types";
import { AttributeSelector } from "./AttributeSelector";
import EmblaCarousel from "./Carousel";

interface ProductContentProps {
    collectionPath: string;
    categoryPath: string;
    productPath: string;
    product: IProduct;
}

export function ProductContent({
    collectionPath,
    categoryPath,
    productPath,
    product,
}: ProductContentProps) {
    const { data: user, isPending: isUserPending } = useCurrentUser();
    const { data: userFavorites } = useFavoritesFromUser();

    const { addToCart: addToLocalCart } = useCartStore();
    const { isInFavorites, toggleFavorite: toggleLocalFavorite } =
        useFavoritesStore();

    const {
        data: colors,
        isPending: isColorsPending,
        isError: isColorsError,
    } = useProductColors(product.id);
    const {
        data: types,
        isPending: isTypesPending,
        isError: isTypesError,
    } = useProductTypes(product.id);
    const {
        data: sizes,
        isPending: isSizesPending,
        isError: isSizesError,
    } = useProductSizes(product.id);

    const addToFavoriteMutation = useAddFavorite();
    const deleteFromFavoriteMutation = useDeleteFavorite();
    const addCartItemToUserMutation = useAddCartItemToUser();

    const [chosenSize, setChosenSize] = useState("");
    const [chosenType, setChosenType] = useState("");
    const [chosenColor, setChosenColor] = useState("");
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (!product) return;

        setChosenSize(product?.productSizes[0]?.size.name || "");
        setChosenType(product?.productTypes[0]?.type.name || "");
        setChosenColor(product?.productColors[0]?.color.name || "");

        addToRecentlyViewed(product);
    }, [product]);

    const isLiked = user
        ? userFavorites?.some((item) => item === product.id) || false
        : isInFavorites(product.id);

    const handleLikeToggle = async () => {
        if (!product) return;

        if (user && !isUserPending) {
            if (isLiked) {
                deleteFromFavoriteMutation.mutate(product.id);
            } else {
                addToFavoriteMutation.mutate(product.id);
            }
        } else {
            toggleLocalFavorite(product.id);
            if (typeof window !== "undefined") {
                toast.success(
                    isLiked ? "Removed from favorites" : "Added to favorites"
                );
            }
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;

        if (user && !isUserPending) {
            addCartItemToUserMutation.mutate({
                size: chosenSize,
                type: chosenType,
                color: chosenColor,
                quantity,
                productId: product.id,
            });
        } else {
            addToLocalCart(
                product.id,
                chosenSize,
                chosenColor,
                chosenType,
                quantity
            );
            toast.success("Added to cart");
        }
    };

    const OPTIONS: EmblaOptionsType = { loop: true };

    return (
        <div className="flex sm:flex-col gap-[15px] items-start text-white">
            <div className="relative w-[50%] sm:w-full">
                <button
                    onClick={handleLikeToggle}
                    className="absolute group top-[10px] right-[10px] z-10 text-xs flex justify-center items-center gap-[10px] transition-all duration-300 cursor-pointer min-w-[60px] w-[60px] min-h-[60px] h-[60px] p-[5px]"
                >
                    <HeartIcon
                        className={`group-hover:fill-red-600 group-hover:stroke-red-600 transition-all duration-300 ${
                            isLiked
                                ? "w-[50px] stroke-red-600 fill-red-600"
                                : "w-[40px] stroke-white stroke-[1.5] fill-none"
                        }`}
                    />
                </button>

                <EmblaCarousel
                    slides={[product.banner, ...product.images]}
                    options={OPTIONS}
                />
            </div>

            <div className="flex flex-col gap-[10px] w-[50%] sm:w-full">
                <div className="flex flex-col gap-[25px] bg-white/5 border border-white/5 px-[20px] xl:p-[15px] py-[20px]">
                    <Breadcrumbs
                        collectionPath={collectionPath}
                        categoryPath={categoryPath}
                        productPath={productPath}
                    />

                    <h2 className="text-5xl 2xl:text-4xl font-bold font-perandory tracking-wider">
                        {product.name}
                    </h2>

                    <div className="flex gap-[15px] items-end justify-between mt-[10px]">
                        <div className="flex gap-[10px] items-center">
                            <div className="text-3xl font-semibold">
                                ${product.price}
                            </div>
                            {product.oldPrice && (
                                <div className="text-lg line-through text-neutral-200 font-light">
                                    ${product.oldPrice}
                                </div>
                            )}
                        </div>
                        <div
                            className={`text-xl font-perandory tracking-wider ${
                                product.available
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {product.available ? "In stock" : "Out of stock"}
                        </div>
                    </div>

                    <div className="mt-[20px] xl:mt-[10px] text-base font-light text-neutral-300 break-words">
                        {product.description}
                    </div>
                    <hr className="w-full border-white/5 border-t" />
                    <div className="text-sm font-light text-neutral-200 break-words">
                        {product.composition}
                    </div>

                    <div className="flex flex-col gap-[20px] mt-[30px] text-sm">
                        {colors && colors.length > 0 ? (
                            <div className="flex flex-wrap gap-[10px] items-center">
                                <div className="flex gap-[30px]">
                                    <div className="font-perandory tracking-wider text-xl">
                                        Color:
                                    </div>
                                    <ul className="flex flex-wrap gap-[10px]">
                                        {colors.map((item, i) => (
                                            <li
                                                key={i}
                                                onClick={() =>
                                                    setChosenColor(
                                                        item.color.name
                                                    )
                                                }
                                                className="h-[25px]"
                                            >
                                                <button
                                                    className={`w-[25px] h-[25px] border border-transparent hover:border-white/20 cursor-pointer ${
                                                        chosenColor ===
                                                        item.color.name
                                                            ? "border-white/100"
                                                            : "border-black"
                                                    }`}
                                                    style={{
                                                        backgroundColor:
                                                            item.color.hexCode,
                                                    }}
                                                ></button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex gap-[10px] items-center">
                                    <div className="text-xs text-neutral-400">
                                        Chosen color:{" "}
                                    </div>
                                    <div className="capitalize font-perandory tracking-wider text-xl">
                                        {chosenColor}
                                    </div>
                                </div>
                            </div>
                        ) : isColorsPending ? (
                            <ColorSelectorSkeleton />
                        ) : isColorsError ? (
                            "Can`t find colors"
                        ) : null}

                        {types && types.length > 0 ? (
                            <AttributeSelector
                                attributeItems={types}
                                label="Types:"
                                getName={(item) => item.type.name}
                                chosenValue={chosenType}
                                setFunction={setChosenType}
                            />
                        ) : isTypesPending ? (
                            <AttributeSelectorSkeleton label="Types" />
                        ) : isTypesError ? (
                            "Can`t find types"
                        ) : null}

                        {sizes && sizes.length > 0 ? (
                            <AttributeSelector
                                attributeItems={sizes}
                                label="Sizes:"
                                getName={(item) => item.size.name}
                                chosenValue={chosenSize}
                                setFunction={setChosenSize}
                            />
                        ) : isSizesPending ? (
                            <AttributeSelectorSkeleton label="Sizes" />
                        ) : isSizesError ? (
                            "Can`t find sizes"
                        ) : null}

                        <div className="relative flex gap-[30px] items-center">
                            <div className="font-perandory tracking-wider text-xl">
                                Quantity
                            </div>
                            <div className="flex gap-[15px] items-center">
                                <button
                                    className="p-[7px] text-center border border-white/5 w-[40px] h-[40px] bg-white/5 hover:bg-white/10 active:bg-white active:text-black transition-all duration-200"
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
                                    className="p-[7px] text-center border border-white/5 w-[40px] h-[40px] bg-white/5 hover:bg-white/10 active:bg-white active:text-black transition-all duration-200"
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

                <div className="flex md:flex-col justify-between gap-[10px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[10px]">
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
                        Add to cart
                    </MonoButton>
                    <MonoButton
                        onClick={handleLikeToggle}
                        className="w-full h-[50px]"
                    >
                        {isLiked ? "Remove from favorites" : "Add to favorites"}
                    </MonoButton>
                </div>
            </div>
        </div>
    );
}
