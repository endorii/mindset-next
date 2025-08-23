import CategoriesWrapper from "@/features/categories/components/CategoriesWrapper";
import ShopTitle from "@/shared/ui/titles/ShopTitle";

export default async function CategoriesSlug({
    params,
}: {
    params: Promise<{ categoriesSlug: string }>;
}) {
    const { categoriesSlug } = await params;

    return (
        <div className="flex flex-col gap-[50px] mt-[30px]">
            <ShopTitle
                title={`Категорії ${categoriesSlug}`}
                subtitle={`Categories ${categoriesSlug}`}
            />
            <CategoriesWrapper />
        </div>
    );
}
