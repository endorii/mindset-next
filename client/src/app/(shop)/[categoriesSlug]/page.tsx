"use client";

import { notFound, usePathname } from "next/navigation";
import { useCollection } from "@/features/collections/hooks/useCollections";
import H3 from "@/shared/ui/text/H3";
import DataListWrapper from "@/shared/ui/wrappers/DataListWrapper";
import CategoryCard from "@/features/categories/components/CategoryCard";
import { ICategory } from "@/features/categories/types/categories.types";
import Link from "next/link";

export default function Collection() {
    const pathname = usePathname();
    const collectionPath = pathname.split("/")[1] || "";

    const {
        data: collection,
        isError,
        isLoading,
    } = useCollection(collectionPath);

    const categories = collection?.categories || [];

    if (isLoading) {
        return <p>Завантаження...</p>;
    }

    if (!collection) {
        return notFound();
    }

    if (isLoading) return <p>Завантаження...</p>;
    if (isError || !collection) return <p>Колекція не знайдена</p>;

    return (
        <div className="flex flex-col gap-[50px] mt-[50px]">
            <div className="text-white relative px-[70px]">
                <div className="text-8xl font-extrabold">
                    Категорії {collection.name}
                </div>
                <div className="absolute top-[40px] left-[70px] text-8xl font-qwitcher-grypen text-white/40">
                    Categories {collection.name}
                </div>
            </div>

            {categories && categories.length > 0 ? (
                <ul className="flex flex-col w-full ">
                    {categories.map((category: ICategory, i: number) => (
                        <li key={i} className="relative cursor-pointer">
                            <div className="absolute opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full font-thin text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                                {i % 2 === 0 ? (
                                    <>
                                        <Link
                                            className="flex items-center pl-[9%] w-full h-full"
                                            href={`${collection.path}/${category.path}`}
                                        >
                                            <div className="border-b">
                                                Переглянути
                                            </div>
                                        </Link>
                                        <div className="absolute top-[50%] translate-y-[-50%] right-[2%] w-[20%] text-base text-white">
                                            Відкрийте для себе світ
                                            універсальності та комфорту з нашою
                                            колекцією футболок. Це не просто
                                            базовий елемент гардероба, а
                                            справжнє полотно для самовираження,
                                            що ідеально вписується в будь-який
                                            стиль та настрій. Ми пропонуємо
                                            широкий вибір футболок, від
                                            класичних моделей для повсякденного
                                            носіння до яскравих акцентів, що
                                            підкреслять вашу індивідуальність.
                                            Кожна футболка виготовлена з
                                            якісних, приємних до тіла
                                            матеріалів, що забезпечують
                                            максимальний комфорт та
                                            довговічність. Незалежно від того,
                                            чи шукаєте ви ідеальну футболку для
                                            спорту, відпочинку, або як основу
                                            для створення модного образу, у нас
                                            ви знайдете те, що потрібно.
                                            Комбінуйте їх із джинсами,
                                            спідницями, піджаками чи светрами –
                                            можливості безмежні. Обирайте свою
                                            ідеальну футболку та відчуйте
                                            досконалість у простоті!
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute top-[50%] translate-y-[-50%] left-[2%] w-[20%] text-base text-white">
                                            Зустрічайте Aesthetic – шепіт
                                            сутінків, відлуння минулого, що
                                            танцює з майбутнім. Це стан душі,
                                            витканий з тіней і світла. Кожен
                                            виріб – загадка, створена з
                                            матеріалів, що відчувають ваш подих,
                                            та ліній, що малюють силуети
                                            невимовної краси. Лише чиста форма
                                            та прихована глибина, що промовляє
                                            до тих, хто слухає тишу. Aesthetic –
                                            це запрошення до подорожі у власну
                                            індивідуальність, де кожен елемент
                                            стає артефактом вашої історії. Це
                                            вибір тих, хто цінує стриману
                                            елегантність, що розкривається лише
                                            обраним, залишаючи шлейф таємниці.
                                            Одягніть Aesthetic і дозвольте йому
                                            розкрити вашу справжню сутність.
                                        </div>
                                        <Link
                                            className="flex items-center pr-[9%] w-full h-full justify-end"
                                            href={category.path}
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
                                    {category.name}
                                </div>
                                <img
                                    src={`http://localhost:5000/${category.banner}`}
                                    alt={category.name}
                                    className="w-full h-[750px] object-cover filter transition-all duration-600"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="text-white text-center m-[50px] text-[24px] uppercase font-bold rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[30px] py-[15px]">
                        Категорії відсутні
                    </div>
                </div>
            )}
        </div>
    );
}
