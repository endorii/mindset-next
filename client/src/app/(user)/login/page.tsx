"use client";

import { useEffect } from "react";
import { user } from "@/data/user";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    useEffect(() => {
        if (user) {
            // router.replace("/account");
        }
    }, []);

    return (
        <div className="flex justify-between gap-[50px]">
            <div className="flex flex-col gap-[15px] w-full">
                <h3 className="mt-[30px] text-xl font-bold">
                    Захист вашої інформації
                </h3>
                <ul className="text-gray-500 flex flex-col gap-[7px] text-sm p-[30px]">
                    <li>– Ваші дані зберігаються безпечно;</li>
                    <li>– ми використовуємо захищене з'єднання;</li>
                    <li>– інформація не передається третім особам;</li>
                    <li>– конфіденційність — наш пріоритет.</li>
                </ul>
            </div>

            <div className="flex flex-col gap-[15px] w-full">
                <h3 className="mt-[30px] text-xl font-bold">Вхід </h3>
                <form className="border border-gray-200 p-[30px] flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[4px]">
                        <label className="text-xs text-gray-600" htmlFor="">
                            електонна пошта*
                        </label>
                        <input
                            type="email"
                            className="mb-2 border-b outline-0 text-sm w-full p-[10px]"
                        />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <label className="text-xs text-gray-600" htmlFor="">
                            пароль*
                        </label>
                        <input
                            type="password"
                            className="mb-4 border-b outline-0 text-sm w-full p-[10px]"
                        />
                    </div>
                    <button className="w-full border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white px-[20px] py-[15px] mt-[30px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed">
                        Увійти
                    </button>
                </form>
            </div>

            <div className="flex flex-col gap-[15px] w-full">
                <h3 className="mt-[30px] text-xl font-bold">Реєстрація</h3>
                <form className="border border-gray-200 p-[30px] flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[4px]">
                        <label className="text-xs text-gray-600" htmlFor="">
                            електонна пошта*
                        </label>
                        <input
                            type="email"
                            placeholder="введіть електронну пошту..."
                            className="mb-2 border-b outline-0 text-sm w-full p-[10px]"
                        />
                    </div>
                    <div className="flex flex-col gap-[4px] relative">
                        <label className="text-xs text-gray-600" htmlFor="">
                            пароль*
                        </label>
                        <input
                            type="password"
                            placeholder="введіть пароль..."
                            className="mb-4 border-b outline-0 text-sm w-full p-[10px]"
                        />
                        <div className="text-xs text-gray-500 absolute bottom-[-10px]">
                            мінімально 8 символів
                        </div>
                    </div>
                    <div className="text-sm flex flex-col gap-[7px] mt-[30px]">
                        <div className="flex gap-[10px] items-center">
                            <input type="checkbox" name="" id="" className="" />
                            <div className="text-gray-600">
                                Я погоджуюсь з правилами магазину
                            </div>
                        </div>
                        <div className="flex gap-[10px] items-center">
                            <input type="checkbox" name="" id="" className="" />
                            <div className="text-gray-600">
                                Згідний отримувати комерційні пропозиції від
                                mindset.ua на вказаний email
                            </div>
                        </div>
                    </div>
                    <button className="w-full border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white px-[20px] py-[15px] mt-[30px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed">
                        Зареєструватися
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
