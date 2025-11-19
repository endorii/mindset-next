import { ICategory } from "@/features/categories/types/categories.types";
import { ProductsSection } from "@/features/products/components/ProductsSection";
import { ErrorWithMessage } from "@/shared/ui/components";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ collectionSlug: string; categorySlug: string }>;
}) {
    const { collectionSlug, categorySlug } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop/categories/${collectionSlug}/${categorySlug}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) {
        return {
            title: `Category ${categorySlug} – Error`,
            description: "Failed to load category",
        };
    }

    const category: ICategory = await res.json();

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

    let category: ICategory | null = null;
    let errorMessage = "";

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/shop/categories/${collectionSlug}/${categorySlug}`,
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            const text = await res.text();
            console.error("Nest API error response:", text);
            errorMessage =
                JSON.parse(text).message || "Error loading categories";
        } else {
            category = await res.json();
        }
    } catch (error: any) {
        console.error(error);
        errorMessage = error.message || "Unknown error";
    }

    if (errorMessage) {
        return (
            <div className="flex flex-col gap-4 mt-10 text-red-600">
                <ShopTitle title={`Error`} />
                <ErrorWithMessage message={errorMessage} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[10px] mt-[10px]">
            <ShopTitle title={`Products ${collectionSlug} / ${categorySlug}`} />

            <ProductsSection
                collectionPath={collectionSlug}
                categoryPath={categorySlug}
                products={category?.products}
            />
        </div>
    );
}
