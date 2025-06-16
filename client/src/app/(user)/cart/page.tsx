"use client";

import Link from "next/link";
import CloseIcon from "@/components/Icons/CloseIcon";
import HeartIcon from "@/components/Icons/HeartIcon";
import { useUser } from "@/lib/hooks/useUsers";
import { ICartItem } from "@/types/cart/cart.types";
import Image from "next/image";

function Cart() {
    const { data: user, isLoading, error } = useUser("johnsmith@gmail.com");

    const cartItems: ICartItem[] = user?.cart || [];

    const totalPrice = cartItems.reduce((total, item) => {
        if (!item.product) return total;
        return total + item.product.price * item.quantity;
    }, 0);

    if (isLoading) {
        return <p>Завантаження кошика...</p>;
    }

    if (error) {
        return (
            <p>
                Помилка завантаження кошика:{" "}
                {error.message || "Невідома помилка"}
            </p>
        );
    }

    return (
        <div>
            <h3 className="mt-[30px] text-xl uppercase font-bold">Кошик:</h3>
            <div className="flex justify-between">
                {cartItems.length > 0 ? (
                    <ul className="mt-[30px] flex flex-col gap-[30px] w-[70%] max-h-[80vh] overflow-y-scroll">
                        {cartItems.map((item) => {
                            const { product } = item;

                            if (!product) return null;

                            return (
                                <li
                                    key={item.id}
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
                                                        Кількість:{" "}
                                                        {item.quantity}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Колір: {item.color}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between gap-[10px]">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    className="group flex text-xs items-center gap-[20px] w-full border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white px-[20px] py-[7px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed"
                                                >
                                                    <CloseIcon className="w-[20px] stroke-white group-hover:stroke-black transition-all duration-300" />
                                                    <div>Видалити</div>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    className="group flex text-xs items-center gap-[20px] w-full border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white px-[20px] py-[7px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed"
                                                >
                                                    <HeartIcon className="w-[22px] stroke-white group-hover:stroke-black transition-all duration-300" />
                                                    <div>
                                                        Додати до Вподобаного
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="mt-[30px] text-lg">Кошик порожній</div>
                )}
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
