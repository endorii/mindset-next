"use client";

import { useShopCollections } from "@/features/collections/hooks/useCollections";
import { BurgerMenuIcon, CloseIcon } from "@/shared/icons";
import { useEffect, useState } from "react";
import { MenuSection } from "./MenuSection";

const sections = [
    {
        title: "Navigation",
        items: [
            { name: "Main", href: "/" },
            { name: "Cart", href: "/cart" },
            { name: "Favorites", href: "/favorites" },
            { name: "Account/Log In", href: "/account" },
        ],
    },
    {
        title: "Information",
        items: [
            { name: "Our policy", href: "#" },
            { name: "About us", href: "#" },
            { name: "FAQ", href: "#" },
            { name: "Contacts", href: "#" },
        ],
    },
    {
        title: "Social media",
        items: [
            { name: "Instagram", href: "#" },
            { name: "Telegram", href: "#" },
            { name: "Facebook", href: "#" },
        ],
    },
];

export function HeaderBurger() {
    const { data: collections, isPending: isCollectionsPending } =
        useShopCollections();
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div className="text-center">
            <button className="relative" onClick={() => setIsOpen(true)}>
                <BurgerMenuIcon className="w-[25px] xs:w-[20px] fill-none stroke-2 stroke-white" />
            </button>

            <div
                className={`
                    absolute top-0 left-0 w-full h-screen bg-black transition-opacity duration-400 ease-in-out
                    ${
                        isOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }
                    z-50 flex flex-col justify-center text-white overflow-y-auto py-[50px]
                `}
            >
                <button
                    onClick={handleClose}
                    className="cursor-pointer fixed top-[20px] left-[30px] sm:left-[10px] transition-colors z-10"
                >
                    <CloseIcon className="w-[25px] fill-none stroke-2 stroke-white" />
                </button>

                <div className="flex flex-col p-[30px] gap-[50px] overflow-y-auto">
                    {collections &&
                        collections.length > 0 &&
                        !isCollectionsPending && (
                            <MenuSection
                                title="Our collections"
                                onItemClick={handleClose}
                                items={collections.map((c) => ({
                                    name: c.name,
                                    href: `/${c.path}`,
                                }))}
                            />
                        )}

                    {sections.map((section, i) => (
                        <MenuSection
                            key={i}
                            title={section.title}
                            items={section.items}
                            onItemClick={handleClose}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
