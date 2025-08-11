"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import {
    TiktokIcon,
    InstagramIcon,
    TelegramIcon,
    LocationIcon,
    MailIcon,
    PhoneIcon,
} from "@/shared/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import FooterNavList from "../FooterNavList";
import FooterNavListItem from "../FooterNavListItem";
import { useGetCollections } from "@/features/collections/hooks/useCollections";

const Footer = () => {
    const { data: collections, isPending: isCollectionsPending } =
        useGetCollections();

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

    return (
        <footer className="bg-transparent flex flex-col text-white mt-[50px] xs:mt-[10px]">
            <div className="relative flex sm:flex-col gap-[15px] sm:gap-[30px] p-[50px] sm:p-[20px] ">
                <div className="flex flex-col gap-[25px] text-sm min-w-[300px] md:min-w-[250px]">
                    <Link
                        href="/"
                        className="font-bold text-5xl tracking-tighter"
                    >
                        mindset
                    </Link>
                    <div className="text-xs font-light text-white/70">
                        Це більше, ніж одяг. Це ти. <br />
                        Для тих, хто не йде — а залишає слід. <br />
                        Твій стиль. Твоя енергія. Твій вайб.
                    </div>
                </div>
                <div className="w-full grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xxs:grid-cols-1 gap-[150px] 2xl:gap-[100px] xl:gap-[70px] lg:gap-[50px] md:gap-[30px]">
                    {collections && !isCollectionsPending && (
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
                        <FooterNavListItem href="/cart">
                            Корзина
                        </FooterNavListItem>
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
                    <FooterNavList title="Контакти">
                        <Link
                            href="tel:0970000000"
                            className="text-white/80 text-sm flex gap-[10px] items-center hover:text-white group"
                        >
                            <PhoneIcon className="group-hover:stroke-white fill-none w-[25px] stroke-2 stroke-white/80" />
                            <div className="group-hover:underline">
                                +38 (097) 00 00 000
                            </div>
                        </Link>
                        <Link
                            href="mailto:job.tenshi@gmail.com"
                            className="text-white/80 text-sm flex gap-[10px] items-center hover:text-white group"
                        >
                            <MailIcon className="group-hover:stroke-white fill-none w-[25px] stroke-2 stroke-white/80" />
                            <div className="group-hover:underline">
                                job.tenshi@gmail.com
                            </div>
                        </Link>
                        <Link
                            target="_blank"
                            href="https://maps.app.goo.gl/B2e3TfjzMYLEjstU6"
                            className="text-white/80 text-sm flex gap-[10px] items-center hover:text-white group"
                        >
                            <LocationIcon className="group-hover:stroke-white fill-none w-[25px] stroke-2 stroke-white/80" />
                            <div className="group-hover:underline">
                                Україна, м. Луцьк
                            </div>
                        </Link>
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
            </div>
            <div className="relative border-t border-white/10 text-xs text-white/50 font-semibold">
                <div className="absolute w-full flex justify-center items-center p-[10px]">
                    Mindset © 2025
                </div>
            </div>
        </footer>
    );
};

export default Footer;
