"use client";

import { useShopCollections } from "@/features/collections/hooks/useCollections";
import { ErrorWithMessage } from "@/shared/ui/components";
import {
    FooterBottom,
    FooterBrand,
    FooterContacts,
    FooterNavList,
    FooterNavListItem,
    FooterNavigation,
} from "../footer";

export function Footer() {
    const { data: collections, isPending, isError } = useShopCollections();

    return (
        <footer className="bg-transparent flex flex-col text-white mt-[50px] xs:mt-[10px]">
            <div className="relative flex sm:flex-col gap-[15px] sm:gap-[30px] p-[50px] sm:p-[20px]">
                <FooterBrand />

                <div
                    className="w-full grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xxs:grid-cols-1 
                    gap-[150px] 2xl:gap-[100px] xl:gap-[70px] lg:gap-[50px] md:gap-[30px]"
                >
                    {collections && collections.length > 0 ? (
                        <FooterNavList title="Collections">
                            {collections.map((c) => (
                                <FooterNavListItem href={c.path} key={c.id}>
                                    {c.name}
                                </FooterNavListItem>
                            ))}
                        </FooterNavList>
                    ) : isPending ? (
                        <div>Loading...</div>
                    ) : isError ? (
                        <ErrorWithMessage message="Failed to load collections." />
                    ) : null}

                    <FooterNavigation />
                    <FooterContacts />
                </div>
            </div>

            <FooterBottom />
        </footer>
    );
}
