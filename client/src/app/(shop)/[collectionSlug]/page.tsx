import { CategoriesSection } from "@/features/categories/components/CategoriesSection";
import { ICollection } from "@/features/collections/types/collections.types";
import { ErrorWithMessage } from "@/shared/ui/components";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ collectionSlug: string }>;
}): Promise<Metadata> {
    const { collectionSlug } = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop/collections/${collectionSlug}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) {
        return {
            title: `Колекція ${collectionSlug} – Помилка`,
            description: "Не вдалося завантажити колекцію",
        };
    }

    const collection: ICollection = await res.json();

    return {
        title: `Колекція "${collection.name}" – Mindset`,
        description:
            collection.description ||
            `Дивіться категорії та товари з колекції ${collectionSlug} від Mindset.`,
        openGraph: {
            title: `Колекція "${collection.name}" – Mindset`,
            description: collection.description,
            images: collection.banner ? [collection.banner] : [],
            type: "website",
            locale: "uk_UA",
        },
    };
}

export default async function CollectionPage({
    params,
}: {
    params: Promise<{ collectionSlug: string }>;
}) {
    const { collectionSlug } = await params;

    let collection: ICollection | null = null;
    let errorMessage = "";

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/shop/collections/${collectionSlug}`,
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            const text = await res.text();
            console.error("Nest API error response:", text);
            errorMessage =
                JSON.parse(text).message || "Помилка завантаження категорій";
        } else {
            collection = await res.json();
        }
    } catch (error: any) {
        console.error(error);
        errorMessage = error.message || "Невідома помилка";
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
        <div className="flex flex-col gap-[30px] mt-[30px]">
            <ShopTitle
                title={`${collection?.name || collectionSlug} categories `}
            />
            <CategoriesSection
                collectionPath={collectionSlug}
                categories={collection?.categories}
            />
        </div>
    );
}
