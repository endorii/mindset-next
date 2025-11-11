import { CollectionsSection } from "@/features/collections/components/CollectionsSection";
import { ICollection } from "@/features/collections/types/collections.types";
import { Welcome } from "@/shared/components";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mindset – головна сторінка",
    description: "Купуйте товари, які асоціюються з вашоб особистістю.",
    openGraph: {
        title: "Mindset",
        description: "Інтернет магазин особливого одягу.",
        url: "https://localhost:3000",
        siteName: "Mindset",
        locale: "uk_UA",
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
        throw new Error("Не вдалося отримати колекції");
    }

    const collections: ICollection[] = await res.json();

    return (
        <div>
            <Welcome />
            <div className="flex flex-col gap-[50px]">
                <ShopTitle title="Колекції" subtitle="Collections" />
                <CollectionsSection collections={collections} />
            </div>
        </div>
    );
}
