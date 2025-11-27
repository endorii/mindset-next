import { ProductSection } from "@/features/products/components/ProductSection";
import { IProduct } from "@/features/products/types/products.types";
import { ReviewsOnProductPage } from "@/features/reviews/components";
import {
    PopularProducts,
    ProductsFromSameCollection,
    RecentlyViewedProducts,
} from "@/shared/components";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

async function fetchProduct(
    collectionSlug: string,
    categorySlug: string,
    productSlug: string
): Promise<IProduct> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop/products/${collectionSlug}/${categorySlug}/${productSlug}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) notFound();

    const product: IProduct = await res.json();

    if (!product.isVisible) {
        notFound();
    }

    return product;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{
        collectionSlug: string;
        categorySlug: string;
        productSlug: string;
    }>;
}): Promise<Metadata> {
    const { collectionSlug, categorySlug, productSlug } = await params;

    const product = await fetchProduct(
        collectionSlug,
        categorySlug,
        productSlug
    );

    return {
        title: `"${product.name}" | ${categorySlug} | ${collectionSlug} – Mindset`,
        description:
            product.description ||
            `See the product from the category ${categorySlug} by Mindset.`,
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

    const product = await fetchProduct(
        collectionSlug,
        categorySlug,
        productSlug
    );

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
