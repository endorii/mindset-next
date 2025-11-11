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
            title: `Категорія ${categorySlug} – Помилка`,
            description: "Не вдалося завантажити категорію",
        };
    }

    const category: ICategory = await res.json();

    return {
        title: `Категорія "${category.name}" | ${collectionSlug} – Mindset`,
        description:
            category.description ||
            `Дивіться товари з категорії ${categorySlug} від Mindset.`,
        openGraph: {
            title: `Категорія "${category.name}" | ${collectionSlug} – Mindset`,
            description: category.description,
            images: category.banner ? [category.banner] : [],
            type: "website",
            locale: "uk_UA",
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
                JSON.parse(text).message || "Помилка завантаження категорій";
        } else {
            category = await res.json();
        }
    } catch (error: any) {
        console.error(error);
        errorMessage = error.message || "Невідома помилка";
    }

    if (errorMessage) {
        return (
            <div className="flex flex-col gap-4 mt-10 text-red-600">
                <ShopTitle title={`Помилка`} subtitle={`Error`} />
                <ErrorWithMessage message={errorMessage} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[50px]">
            <ShopTitle
                title={`Товари ${collectionSlug} / ${categorySlug}`}
                subtitle={`Products ${collectionSlug} / ${categorySlug}`}
            />

            <ProductsSection
                collectionPath={collectionSlug}
                categoryPath={categorySlug}
                products={category?.products}
            />
        </div>
    );
}
