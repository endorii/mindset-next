"use client";

import Link from "next/link";
import { InstagramIcon, TelegramIcon, TiktokIcon } from "@/shared/icons";
import { useCollections } from "@/features/collections/hooks/useCollections";
import ChooseLink from "@/shared/ui/buttons/ChooseLink";
import { ICollection } from "@/features/collections/types/collections.types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FooterNavList from "../FooterNavList";
import { div } from "motion/react-client";
import FooterNavListItem from "../FooterNavListItem";

const Footer = () => {
    const { data: collections, isError, error, isLoading } = useCollections();

    const pathname = usePathname();
    const collectionPath = pathname.split("/").filter(Boolean)[0] || null;

    const [currentCollection, setCurrentCollection] =
        useState<ICollection | null>(null);

    useEffect(() => {
        if (collectionPath) {
            const foundCollection =
                collections?.find((c) => c.path === collectionPath) || null;
            setCurrentCollection(foundCollection);
        }
    }, [collectionPath]);
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
        <footer className="bg-transparent flex flex-col text-white mt-[30px]">
            <div className="relative flex justify-between gap-[20px] p-[50px]">
                <div className="flex flex-col justify-between gap-[25px] text-sm min-w-[500px]">
                    <Link
                        href="/"
                        className="font-bold text-5xl tracking-tighter"
                    >
                        mindset
                    </Link>
                    <div className="text-xs font-light text-white/70 ">
                        Це більше, ніж одяг. Це ти. <br />
                        Для тих, хто не йде — а залишає слід. <br />
                        Твій стиль. Твоя енергія. Твій вайб.
                    </div>
                </div>
                {collections && (
                    <FooterNavList title="Колекції">
                        {collections.map((collection) => (
                            <FooterNavListItem
                                href={collection.path}
                                key={collection.id}
                            >
                                {collection.name}
                            </FooterNavListItem>
                        ))}
                    </FooterNavList>
                )}
                <FooterNavList title="Навігація">
                    <FooterNavListItem href="/">Головна</FooterNavListItem>
                    <FooterNavListItem href="/cart">Корзина</FooterNavListItem>
                    <FooterNavListItem href="/favorites">
                        Вподобані
                    </FooterNavListItem>
                    <FooterNavListItem href="/account">
                        Акаунт/вхід
                    </FooterNavListItem>
                </FooterNavList>
                <FooterNavList title="Інформація">
                    <FooterNavListItem href="/policy">
                        Наша політика
                    </FooterNavListItem>
                    <FooterNavListItem href="/return">
                        Повернення
                    </FooterNavListItem>
                    <FooterNavListItem href="/faq">FAQ</FooterNavListItem>
                </FooterNavList>
                <FooterNavList title="Навігація">
                    <div className="text-white/80 text-sm">
                        <div></div>
                        <div>342342344234</div>
                    </div>
                    <div className="text-white/80 text-sm">
                        <div></div>
                        <div>fdffsd@sfd.com</div>
                    </div>
                    <div className="text-white/80 text-sm">
                        <div></div>
                        <div>Україна, м. Луцьк</div>
                    </div>
                    <div className="flex gap-[15px] mt-[10px]">
                        <div>
                            <button className="cursor-pointer p-[10px] border border-white/10 rounded-[50%] hover:bg-white group transition-all duration-300">
                                <Link href={"#"}>
                                    <TiktokIcon className="w-[20px] fill-white group-hover:fill-black" />
                                </Link>
                            </button>
                        </div>
                        <div>
                            <button className="cursor-pointer p-[10px] border border-white/10 rounded-[50%] hover:bg-white group transition-all duration-300">
                                <Link href={"#"}></Link>
                                <InstagramIcon className="w-[20px] fill-white group-hover:fill-black" />
                            </button>
                        </div>
                        <div>
                            <button className="cursor-pointer p-[10px] border border-white/10 rounded-[50%] hover:bg-white group transition-all duration-300">
                                <Link href={"#"}></Link>
                                <TelegramIcon className="w-[20px] fill-white group-hover:fill-black" />
                            </button>
                        </div>
                    </div>
                </FooterNavList>
            </div>
            <div className="relative flex gap-[10px] justify-end p-[10px] border-t border-white/10 text-xs text-white/50 font-semibold">
                <div className="items-end">Наша політика</div>
                <div className="items-end">FAQ</div>
                <div className="items-end">
                    Працюємо без вихідних з 9:00 до 20:00
                </div>
                <div className="absolute w-full flex justify-center items-center">
                    Mindset © 2025
                </div>
            </div>
        </footer>
    );
};

export default Footer;
