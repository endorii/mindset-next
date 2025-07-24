"use client";

import { useCollections } from "@/features/collections/hooks/useCollections";
import { useTypewriter } from "@/shared/hooks/useTypewriter";
import { ICollection } from "@/features/collections/types/collections.types";
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
                                                    <div className="border-b">
                                                        Переглянути
                                                    </div>
                                                </Link>
                                                <div className="absolute top-[50%] translate-y-[-50%] right-[2%] w-[20%] text-base text-white">
                                                    Зустрічайте Aesthetic –
                                                    шепіт сутінків, відлуння
                                                    минулого, що танцює з
                                                    майбутнім. Це стан душі,
                                                    витканий з тіней і світла.
                                                    Кожен виріб – загадка,
                                                    створена з матеріалів, що
                                                    відчувають ваш подих, та
                                                    ліній, що малюють силуети
                                                    невимовної краси. Лише чиста
                                                    форма та прихована глибина,
                                                    що промовляє до тих, хто
                                                    слухає тишу. Aesthetic – це
                                                    запрошення до подорожі у
                                                    власну індивідуальність, де
                                                    кожен елемент стає
                                                    артефактом вашої історії. Це
                                                    вибір тих, хто цінує
                                                    стриману елегантність, що
                                                    розкривається лише обраним,
                                                    залишаючи шлейф таємниці.
                                                    Одягніть Aesthetic і
                                                    дозвольте йому розкрити вашу
                                                    справжню сутність.
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute top-[50%] translate-y-[-50%] left-[2%] w-[20%] text-base text-white">
                                                    Зустрічайте Aesthetic –
                                                    шепіт сутінків, відлуння
                                                    минулого, що танцює з
                                                    майбутнім. Це стан душі,
                                                    витканий з тіней і світла.
                                                    Кожен виріб – загадка,
                                                    створена з матеріалів, що
                                                    відчувають ваш подих, та
                                                    ліній, що малюють силуети
                                                    невимовної краси. Лише чиста
                                                    форма та прихована глибина,
                                                    що промовляє до тих, хто
                                                    слухає тишу. Aesthetic – це
                                                    запрошення до подорожі у
                                                    власну індивідуальність, де
                                                    кожен елемент стає
                                                    артефактом вашої історії. Це
                                                    вибір тих, хто цінує
                                                    стриману елегантність, що
                                                    розкривається лише обраним,
                                                    залишаючи шлейф таємниці.
                                                    Одягніть Aesthetic і
                                                    дозвольте йому розкрити вашу
                                                    справжню сутність.
                                                </div>
                                                <Link
                                                    className="flex items-center pr-[9%] w-full h-full justify-end"
                                                    href={collection.path}
                                                >
                                                    <div className="border-b">
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
                    <div className="flex justify-center items-center">
                        <div className="text-white text-center my-[70px] text-[24px] uppercase font-bold rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[30px] py-[15px]">
                            Колекції відсутні
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
