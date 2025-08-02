"use client";

import { useCollections } from "@/features/collections/hooks/useCollections";
import { ICollection } from "@/features/collections/types/collections.types";
import { useTypewriter } from "@/shared/hooks";
import Link from "next/link";

export default function HomePage() {
    const { data: collections, error, isLoading, isError } = useCollections();

    const text = "mindset.";
    const typedText = useTypewriter(text, 160);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (
            <div>
                Помилка: {error?.message || "Не вдалося отримати колекції"}
            </div>
        );
    }

    return (
        <div className="">
            <div className="relative ">
                <div className="relative flex flex-col text-white h-screen justify-center items-center">
                    <div className="overflow-hidden text-[440px] font-extrabold uppercase tracking-[-0.05em] leading-[350px]">
                        {typedText}

                        {text === typedText ? null : (
                            <span className="animate-pulse text-[440px] font-thin">
                                |
                            </span>
                        )}
                    </div>

                    <div
                        className={`text-5xl pl-[70px] font-qwitcher-grypen font-light self-start justify-start transition-all duration-450 ${
                            typedText === text ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        your style - your life vision
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-[50px] mt-[100px]">
                <div className="text-white relative px-[70px]">
                    <div className="text-8xl font-extrabold">Колекції</div>
                    <div className="absolute top-[40px] left-[70px] text-8xl font-qwitcher-grypen text-white/40">
                        Collections
                    </div>
                </div>

                {collections && collections.length > 0 ? (
                    <ul className="flex flex-col w-full ">
                        {collections.map(
                            (collection: ICollection, i: number) => (
                                <li key={i} className="relative cursor-pointer">
                                    <div className="absolute opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full font-thin text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                                        {i % 2 === 0 ? (
                                            <>
                                                <Link
                                                    className="flex items-center pl-[9%] w-full h-full"
                                                    href={collection.path}
                                                >
                                                    <div className="border-b border-transparent hover:border-white">
                                                        Переглянути
                                                    </div>
                                                </Link>
                                                <div className="absolute top-[50%] translate-y-[-50%] right-[2%] w-[20%] text-base text-white">
                                                    {collection.description}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute top-[50%] translate-y-[-50%] left-[2%] w-[20%] text-base text-white">
                                                    {collection.description}
                                                </div>
                                                <Link
                                                    className="flex items-center pr-[9%] w-full h-full justify-end"
                                                    href={collection.path}
                                                >
                                                    <div className="border-b border-transparent hover:border-white">
                                                        Переглянути
                                                    </div>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                    <div className="group flex flex-col">
                                        <div
                                            className={`absolute bg-black/25 border border-white/10 shadow-xl px-[50px] py-[15px] backdrop-blur-lg rounded-xl top-[50%] translate-y-[-50%] text-white text-3xl font-thin 
                                ${
                                    i % 2 === 0
                                        ? "left-[10%] translate-x-[-10%]"
                                        : "right-[10%] translate-x-[10%]"
                                } 
                            `}
                                        >
                                            {collection.name}
                                        </div>
                                        <img
                                            src={`http://localhost:5000/${collection.banner}`}
                                            alt={collection.name}
                                            className="w-full h-[750px] object-cover filter transition-all duration-600"
                                        />
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                ) : (
                    <div className="p-[30px]">
                        <div className="relative">
                            <div className="absolute opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full font-thin text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                                <div className="absolute top-[50%] translate-y-[-50%] left-[2%] w-[20%] text-base text-white">
                                    Зараз тут спокій — але це лише затишшя перед
                                    вибухом стилю. За лаштунками кипить робота,
                                    щоб створити для вас щось по-справжньому
                                    унікальне. Ми готуємо колекції, які
                                    перевершать очікування навіть
                                    найвибагливіших модників. Сміливі кольори,
                                    трендові фасони та бездоганний стиль — усе
                                    це вже на шляху до вас. Мода не стоїть на
                                    місці, і ми разом з нею рухаємось у ногу з
                                    часом. Скоро ви побачите новинки, від яких
                                    неможливо буде відвести погляд. Кожна
                                    колекція — це історія, створена з любов’ю до
                                    деталей та натхненням до краси. Те, що зараз
                                    приховане, незабаром відкриється у всій
                                    своїй модній величі.
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <Link
                                        className="flex items-center pr-[9%] w-full h-full"
                                        href={"#"}
                                    >
                                        <div className="border-b border-transparent hover:border-white">
                                            Instagram
                                        </div>
                                    </Link>
                                    <Link
                                        className="flex items-center pr-[9%] w-full h-full"
                                        href={"#"}
                                    >
                                        <div className="border-b border-transparent hover:border-white">
                                            Telegram
                                        </div>
                                    </Link>
                                    <Link
                                        className="flex items-center pr-[9%] w-full h-full"
                                        href={"#"}
                                    >
                                        <div className="border-b border-transparent hover:border-white">
                                            Facebook
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="group flex flex-col">
                                <div
                                    className={`absolute bg-black/25 border border-white/10 shadow-xl px-[50px] py-[15px] backdrop-blur-lg rounded-xl top-[50%] translate-y-[-50%] text-white text-3xl font-thin left-[10%] translate-x-[-10%]`}
                                >
                                    Колекцій ще немає, але вже скоро вони
                                    з’являться!
                                </div>
                                <img
                                    src={`images/waves.png`}
                                    alt={"123"}
                                    className="w-full h-[500px] object-cover filter transition-all duration-600"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
