import CategoriesSection from "@/features/categories/components/CategoriesSection";
import { ICollection } from "@/features/collections/types/collections.types";
import { ErrorWithMessage } from "@/shared/ui/components";
import ShopTitle from "@/shared/ui/titles/ShopTitle";

export default async function collectionSlug({
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
            { next: { revalidate: 10 } }
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
                <ShopTitle title={`Помилка`} subtitle={`Error`} />
                <ErrorWithMessage message={errorMessage} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[50px] mt-[30px]">
            <ShopTitle
                title={`Категорії ${collectionSlug}`}
                subtitle={`Categories ${collectionSlug}`}
            />
            <CategoriesSection
                collectionPath={collectionSlug}
                categories={collection?.categories}
            />
        </div>
    );
}
