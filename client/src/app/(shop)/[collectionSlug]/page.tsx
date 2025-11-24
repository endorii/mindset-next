import { CategoriesSection } from "@/features/categories/components/CategoriesSection";
import { ICollection } from "@/features/collections/types/collections.types";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

async function fetchCollection(collectionSlug: string): Promise<ICollection> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop/collections/${collectionSlug}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) {
        notFound();
    }

    return res.json();
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ collectionSlug: string }>;
}): Promise<Metadata> {
    const { collectionSlug } = await params;
    const collection = await fetchCollection(collectionSlug);

    return {
        title: `Collection "${collection.name}" – Mindset`,
        description:
            collection.description ||
            `See categories and products from the ${collection.name} collection by Mindset.`,
        openGraph: {
            title: `Collection "${collection.name}" – Mindset`,
            description: collection.description,
            images: collection.banner ? [collection.banner] : [],
            type: "website",
            locale: "en_US",
        },
    };
}

export default async function CollectionPage({
    params,
}: {
    params: Promise<{ collectionSlug: string }>;
}) {
    const { collectionSlug } = await params;
    const collection = await fetchCollection(collectionSlug);

    return (
        <div className="flex flex-col gap-[10px] mt-[10px]">
            <ShopTitle title={`${collection.name} categories`} />
            <CategoriesSection
                collectionPath={collectionSlug}
                categories={collection.categories}
            />
        </div>
    );
}
