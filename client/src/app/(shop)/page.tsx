import { CollectionsSection } from "@/features/collections/components/CollectionsSection";
import { ICollection } from "@/features/collections/types/collections.types";
import { Welcome } from "@/shared/components";
import { PopularProductsWrapper } from "@/shared/components/providers/PopularProductsWrapper";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mindset – Main Page",
    description: "Lour style - your life vision.",
    openGraph: {
        title: "Mindset",
        description: "Online cloathes shop.",
        url: "https://localhost:3000",
        siteName: "Mindset",
        locale: "en_US",
        type: "website",
    },
};

export default async function CollectionsPage() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop/collections`,
        {
            next: { revalidate: 60 },
        }
    );

    if (!res.ok) {
        const text = await res.text();
        console.error("Nest API error response:", text);
        throw new Error("Failed to retrieve collections");
    }

    const collections: ICollection[] = await res.json();

    return (
        <div className="flex flex-col gap-10">
            <Welcome />
            <div
                className="flex flex-col gap-[10px] pt-[90px]"
                id="collections"
            >
                <ShopTitle title="Collections" />
                <CollectionsSection collections={collections} />
            </div>
            <PopularProductsWrapper />
        </div>
    );
}
