import { ICategory } from "@/features/categories/types/categories.types";
import { ProductsSection } from "@/features/products/components/ProductsSection";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

async function fetchCategory(
    collectionSlug: string,
    categorySlug: string
): Promise<ICategory> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop/categories/${collectionSlug}/${categorySlug}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) notFound();

    const category: ICategory = await res.json();

    if (!category.isVisible) {
        notFound();
    }

    return category;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ collectionSlug: string; categorySlug: string }>;
}): Promise<Metadata> {
    const { collectionSlug, categorySlug } = await params;
    const category = await fetchCategory(collectionSlug, categorySlug);

    return {
        title: `Category "${category.name}" | ${collectionSlug} – Mindset`,
        description:
            category.description ||
            `See products from the category ${categorySlug} by Mindset.`,
        openGraph: {
            title: `Category "${category.name}" | ${collectionSlug} – Mindset`,
            description: category.description,
            images: category.banner ? [category.banner] : [],
            type: "website",
            locale: "en_US",
        },
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ collectionSlug: string; categorySlug: string }>;
}) {
    const { collectionSlug, categorySlug } = await params;
    const category = await fetchCategory(collectionSlug, categorySlug);

    return (
        <div className="flex flex-col gap-[10px] mt-[10px]">
            <ShopTitle
                title={`Products ${collectionSlug} / ${category.name}`}
            />
            <ProductsSection
                collectionPath={collectionSlug}
                categoryPath={categorySlug}
                products={category.products}
            />
        </div>
    );
}
