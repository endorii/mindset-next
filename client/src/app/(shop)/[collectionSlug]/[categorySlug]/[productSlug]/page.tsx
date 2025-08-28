import { ReviewsOnProductPage } from "@/features/reviews/components";
import {
    RecentlyViewedProducts,
    ProductsFromSameCollection,
    PopularProducts,
} from "@/shared/components";
import { ErrorWithMessage } from "@/shared/ui/components";

import { IProduct } from "@/features/products/types/products.types";
import ProductSection from "@/features/products/components/ProductSection";

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
            title: `Товар ${productSlug} – Помилка`,
            description: "Не вдалося завантажити товар",
        };
    }

    const product: IProduct = await res.json();

    return {
        title: `"${product.name}" | ${categorySlug} | ${collectionSlug} – Mindset`,
        description:
            product.description ||
            `Дивіться товар з колекції ${categorySlug} від Mindset.`,
        openGraph: {
            title: `"${product.name}" | ${categorySlug} | ${collectionSlug} – Mindset`,
            description: product.description,
            images: product.banner ? [product.banner] : [],
            type: "website",
            locale: "uk_UA",
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
            errorMessage =
                JSON.parse(text).message || "Помилка завантаження товару";
        } else {
            product = await res.json();
        }
    } catch (error: any) {
        console.error(error);
        errorMessage = error.message || "Невідома помилка";
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
