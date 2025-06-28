"use client";

import { usePathname } from "next/navigation";
import HeartIcon from "@/components/Icons/HeartIcon";
import { useProduct } from "@/lib/hooks/useProducts";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/lib/hooks/useUsers";
import { IProduct } from "@/types/product/product.types";

import {
    IFavoriteItem,
    ILocalFavoriteItem,
} from "@/types/favorite/favorite.types";
import {
    addFavoriteToUser,
    deleteFavoriteFromUser,
} from "@/lib/api/favorites.api";
import { useAddFavorite, useDeleteFavorite } from "@/lib/hooks/useFavorites";

export default function ProductPage() {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    const collectionPath = pathSegments[0];
    const categoryPath = pathSegments[1];
    const productPath = pathSegments[2];

    const { data: user } = useCurrentUser();

    const {
        data: product,
        isError,
        error,
        isLoading,
    } = useProduct(collectionPath, categoryPath, productPath);

    const [liked, setLiked] = useState(false);

    const [chosenSize, setChosenSize] = useState("");
    const [chosenType, setChosenType] = useState("");
    const [chosenColor, setChosenColor] = useState("");

    const getFavorites = (): ILocalFavoriteItem[] => {
        try {
            const favorites = localStorage.getItem("favorites");
            return favorites ? JSON.parse(favorites) : [];
        } catch (error) {
            console.error("Помилка при читанні localStorage:", error);
            return [];
        }
    };

    const saveFavorites = (favorites: ILocalFavoriteItem[]) => {
        try {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } catch (error) {
            console.error("Помилка при збереженні в localStorage:", error);
        }
    };

    const addToFavorites = (product: IProduct) => {
        const favorites = getFavorites();
        const isAlreadyFavorite: boolean = favorites.some(
            (item: ILocalFavoriteItem) => item.product.id === product.id
        );

        if (!isAlreadyFavorite) {
            const updatedFavorites = [
                ...favorites,
                {
                    id: product.id,
                    size: chosenSize,
                    type: chosenType,
                    color: chosenColor,
                    product,
                    addedAt: new Date().toISOString(),
                },
            ];
            saveFavorites(updatedFavorites);
        }
    };

    const removeFromFavorites = (
        productId: ILocalFavoriteItem["product"]["id"]
    ) => {
        const favorites = getFavorites();
        const updatedFavorites: ILocalFavoriteItem[] = favorites.filter(
            (item: ILocalFavoriteItem) => item.product.id !== productId
        );
        saveFavorites(updatedFavorites);
    };

    useEffect(() => {
        if (!product) return;

        if (user) {
            const isFavorite = user.favorites?.some(
                (item) => item.productId === product.id
            );
            setLiked(isFavorite);
        } else {
            const favorites = getFavorites();
            const isInFavorites = favorites.some(
                (item: ILocalFavoriteItem) => item.product.id === product.id
            );
            setLiked(isInFavorites);
        }
    }, [product, user]);

    const addToFavorite = useAddFavorite();
    const deleteFromFavorite = useDeleteFavorite();

    const handleLikeToggle = async () => {
        if (!product) return;

        const newLikedState = !liked;
        setLiked(newLikedState);

        const dataToSend: IFavoriteItem = {
            size: chosenSize,
            type: chosenType,
            color: chosenColor,
            product,
            productId: product.id,
        };

        if (user) {
            try {
                if (newLikedState) {
                    addToFavorite.mutate({
                        userId: user.id,
                        favoriteItem: dataToSend,
                    });
                    console.log("Успішно додано");
                } else {
                    deleteFromFavorite.mutate({
                        userId: user.id,
                        productId: product.id,
                    });
                    console.log("Успішно видалено");
                }
            } catch (err) {
                console.error("Помилка з серверними вподобаннями:", err);
            }
        } else {
            if (newLikedState) {
                addToFavorites(product);
            } else {
                removeFromFavorites(product.id);
            }
        }
    };

    if (!product) {
        return (
            <div className="pt-[130px] text-center text-[50px]">
                Товар не знайдено 😞
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
                            } `}
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

                {product.productColors.length > 0 ? (
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
                                    onClick={() => {
                                        setChosenColor(item.color.name);
                                    }}
                                >
                                    {item.color.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    ""
                )}

                {product.productTypes.length > 0 ? (
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
                                    onClick={() => {
                                        setChosenType(item.type.name);
                                    }}
                                >
                                    {item.type.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    ""
                )}

                {product.productSizes.length > 0 ? (
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
                                    onClick={() => {
                                        setChosenSize(item.size.name);
                                    }}
                                >
                                    {item.size.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    ""
                )}

                <div className="flex justify-between gap-[15px] mt-[30px]">
                    <button
                        disabled={!product.available}
                        className="w-full border border-transparent hover:border-black hover:bg-white hover:text-black bg-black text-white px-[15px] py-[12px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:border-transparent disabled:text-white"
                    >
                        Купити
                    </button>
                    <button
                        disabled={!product.available}
                        className="w-full border border-transparent hover:border-black hover:bg-white hover:text-black bg-black text-white px-[15px] py-[12px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:border-transparent disabled:text-white"
                    >
                        В кошик
                    </button>
                </div>
            </div>
        </div>
    );
}
