"use client";

import { BurgerMenuIcon, CloseIcon } from "@/shared/icons";
import { useState } from "react";
import MenuSection from "./MenuSection";
import { useGetCollections } from "@/features/collections/hooks/useCollections";

const sections = [
    {
        title: "Навігація",
        subtitle: "Navigation",
        items: [
            { name: "Головна", href: "/" },
            { name: "Корзина", href: "/cart" },
            { name: "Вподобані товари", href: "/favorites" },
            { name: "Акаунт/вхід", href: "/account" },
        ],
    },
    {
        title: "Інформація",
        subtitle: "Information",
        items: [
            { name: "Наша політика", href: "#" },
            { name: "Про нас", href: "#" },
            { name: "FAQ", href: "#" },
            { name: "Контакти", href: "#" },
        ],
    },
    {
        title: "Соціальні мережі",
        subtitle: "Social media",
        items: [
            { name: "Instagram", href: "#" },
            { name: "Telegram", href: "#" },
            { name: "Facebook", href: "#" },
        ],
    },
];

const HeaderBurger = () => {
    const { data: collections, isPending: isCollectionsPending } =
        useGetCollections();
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    return (
        <div>
            <div
                className="cursor-pointer relative flex gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-2xl border border-white/5 hover:bg-white/15 transition-all duration-300"
                onClick={() => setIsOpen(true)}
            >
                <BurgerMenuIcon className="w-[25px] fill-none stroke-2 stroke-white" />
            </div>

            <div
                className={`
                    absolute top-0 left-0 w-full h-screen bg-black transition-opacity duration-400 ease-in-out
                    ${
                        isOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }
                    z-50 flex flex-col justify-center text-white overflow-y-auto pb-[100px]
                `}
            >
                <button
                    onClick={handleClose}
                    className="cursor-pointer fixed top-[20px] left-[23px] p-[10px] rounded-xl hover:bg-white/10 transition-colors"
                >
                    <CloseIcon className="w-[30px] fill-none stroke-2 stroke-white" />
                </button>

                <div className="flex flex-col w-[53%] xl:w-[70%] lg:w-full p-[30px] gap-[70px] overflow-y-auto mt-[50px]">
                    {collections &&
                        collections.length > 0 &&
                        !isCollectionsPending && (
                            <MenuSection
                                title="Наші колекції"
                                subtitle="Collections"
                                onItemClick={handleClose}
                                items={collections.map((c) => ({
                                    name: c.name,
                                    href: `/${c.path}`,
                                }))}
                            />
                        )}

                    {sections.map((section) => (
                        <MenuSection
                            key={section.title}
                            title={section.title}
                            subtitle={section.subtitle}
                            items={section.items}
                            onItemClick={handleClose}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeaderBurger;
