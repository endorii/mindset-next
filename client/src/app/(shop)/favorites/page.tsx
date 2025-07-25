"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import FavoriteCard from "@/features/favorites/components/FavoriteCard";
import {
    useDeleteFavorite,
    useFavoritesFromUser,
} from "@/features/favorites/hooks/useFavorites";
import {
    ILocalFavoriteItem,
    IFavoriteItem,
} from "@/features/favorites/types/favorites.types";
import {
    getFavoritesFromStorage,
    saveFavoritesToStorage,
} from "@/features/favorites/utils/favorites.utils";
import H3 from "@/shared/ui/text/H3";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export const Favorites = () => {
    const { data: user, isLoading, error } = useCurrentUser();
    const { data: userFavorites } = useFavoritesFromUser(user?.id ?? "");

    const [localFavorites, setLocalFavorites] = useState<ILocalFavoriteItem[]>(
        []
    );

    const deleteFavorite = useDeleteFavorite();

    const removeFromLocalStorage = (productId: string) => {
        const updatedFavorites = localFavorites.filter(
            (item) => item.product.id !== productId
        );
        setLocalFavorites(updatedFavorites);
        saveFavoritesToStorage(updatedFavorites);
    };

    const removeFromServerFavorites = async (
        userId: string,
        productId: string
    ) => {
        try {
            deleteFavorite.mutateAsync({ userId, productId });
            console.log("Видалення з серверних вподобань:", productId);
        } catch (error) {
            console.error("Помилка видалення з серверних вподобань:", error);
        }
    };

    useEffect(() => {
        if (!user) {
            const storedFavorites = getFavoritesFromStorage();
            setLocalFavorites(storedFavorites);
        }
    }, [user]);

    const favoritesToShow: IFavoriteItem[] | ILocalFavoriteItem[] = user
        ? userFavorites ?? []
        : localFavorites;

    if (isLoading) {
        return <p>Завантаження улюбленого...</p>;
    }

    if (error && user) {
        return (
            <p>
                Помилка завантаження улюбленого:{" "}
                {error.message || "Невідома помилка"}
            </p>
        );
    }

    console.log("user:", user);
    console.log("userFavorites:", userFavorites);
    console.log("localFavorites:", localFavorites);
    console.log("favoritesToShow:", favoritesToShow);

    return (
        <div className="flex flex-col gap-[50px] mt-[30px]">
            <div className="text-white relative px-[70px]">
                <div className="text-8xl font-extrabold">Вподобані</div>
                <div className="absolute top-[40px] left-[70px] text-8xl font-qwitcher-grypen text-white/40">
                    Favorites
                </div>
            </div>
            {favoritesToShow && favoritesToShow.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-[20px] px-[30px]">
                    {favoritesToShow.map((item, i) => {
                        const isServer = !!user;

                        const handleRemove = () => {
                            if (isServer) {
                                removeFromServerFavorites(
                                    user.id,
                                    item.product.id
                                );
                            } else {
                                removeFromLocalStorage(item.productId);
                            }
                        };

                        return (
                            <FavoriteCard
                                key={i}
                                onRemove={handleRemove}
                                item={item}
                            />
                        );
                    })}
                </ul>
            ) : (
                <div className="p-[30px]">
                    <div className="relative">
                        <div className="absolute opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full font-thin text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                            <div className="absolute top-[50%] translate-y-[-50%] left-[2%] w-[30%] text-base text-white">
                                Хочете легко знайти улюблене пізніше? Просто
                                натисніть сердечко на товарі — і він з'явиться
                                тут! Це зручне місце, щоб повернутись до
                                улюбленого без зайвих пошуків. Список
                                вподобаного допоможе вам зберегти натхнення,
                                створити свій стиль і не забути про речі, які
                                вам сподобались. Навіть якщо ви ще не готові
                                купувати — просто додайте у вподобане, щоб
                                повернутися пізніше. Це може бути ваша майбутня
                                покупка, подарунок або просто гарна ідея. Поки
                                що тут порожньо, але ми впевнені — щось
                                обов’язково припаде вам до душі. Загляньте у
                                колекції, перегляньте новинки, надихніться
                                стилем. Зробіть перший крок — і сторінка
                                наповниться вашими фаворитами.
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <Link
                                    className="flex items-center pr-[9%] w-full h-full"
                                    href={"/"}
                                >
                                    <div className="border-b border-transparent hover:border-white">
                                        Обрати
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="group flex flex-col">
                            <div
                                className={`absolute bg-black/25 border border-white/10 shadow-xl px-[50px] py-[15px] backdrop-blur-lg rounded-xl top-[50%] translate-y-[-50%] text-white text-3xl font-thin left-[10%] translate-x-[-10%]`}
                            >
                                Цей розділ чекає на ваші модні симпатії
                            </div>
                            <img
                                src={`/images/favorites.png`}
                                alt={"1234"}
                                className="w-full h-[350px] object-cover filter transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Favorites;
