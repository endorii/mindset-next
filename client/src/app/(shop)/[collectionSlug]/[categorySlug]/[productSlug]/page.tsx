import { ReviewsOnProductPage } from "@/features/reviews/components";
import {
    PopularProducts,
    ProductsFromSameCollection,
    RecentlyViewedProducts,
} from "@/shared/components";
import { ErrorWithMessage } from "@/shared/ui/components";

import { ProductSection } from "@/features/products/components/ProductSection";
import { IProduct } from "@/features/products/types/products.types";

export async function generateMetadata({
    params,
}: {
    params: Promise<{
        collectionSlug: string;
        categorySlug: string;
        productSlug: string;
    }>;
}) {
    const { collectionSlug, categorySlug, productSlug } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop/products/${collectionSlug}/${categorySlug}/${productSlug}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) {
        return {
            title: `Product ${productSlug} – Error`,
            description: "Failed to load product",
        };
    }

    const product: IProduct = await res.json();

    return {
        title: `"${product.name}" | ${categorySlug} | ${collectionSlug} – Mindset`,
        description:
            product.description ||
            `See the product from the collection ${categorySlug} by Mindset.`,
        openGraph: {
            title: `"${product.name}" | ${categorySlug} | ${collectionSlug} – Mindset`,
            description: product.description,
            images: product.banner ? [product.banner] : [],
            type: "website",
            locale: "en_US",
        },
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{
        collectionSlug: string;
        categorySlug: string;
        productSlug: string;
    }>;
}) {
    const { collectionSlug, categorySlug, productSlug } = await params;

    let product: IProduct | null = null;
    let errorMessage = "";

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/shop/products/${collectionSlug}/${categorySlug}/${productSlug}`,
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            const text = await res.text();
            console.error("Nest API error response:", text);
            errorMessage = JSON.parse(text).message || "Error loading product";
        } else {
            product = await res.json();
        }
    } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error(err);
        errorMessage = err.message || "Unknown error";
    }

    if (errorMessage) {
        return (
            <div className="flex flex-col gap-4 mt-10 text-red-600">
                <ErrorWithMessage message={errorMessage} />
            </div>
        );
    }

    return (
        <div className="flex flex-col px-[30px] sm:p-[10px] py-[10px] gap-x-[30px] gap-y-[20px]">
            <ProductSection
                collectionPath={collectionSlug}
                categoryPath={categorySlug}
                productPath={productSlug}
                product={product}
            />

            <ReviewsOnProductPage product={product} />

            {product?.category?.collection?.id && (
                <ProductsFromSameCollection
                    collectionId={product.category.collection.id}
                />
            )}

            <RecentlyViewedProducts />
            <PopularProducts />
        </div>
    );
}
