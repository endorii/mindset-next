import CategoriesWrapper from "@/features/categories/components/CategoriesWrapper";
import ShopTitle from "@/shared/ui/titles/ShopTitle";

interface CategoriesSlugProps {
    params: {
        categoriesSlug: string;
    };
}

export default function CategoriesSlug({ params }: CategoriesSlugProps) {
    const collectionPath = params.categoriesSlug;

    return (
        <div className="flex flex-col gap-[50px] mt-[30px]">
            <ShopTitle
                title={`Категорії ${collectionPath}`}
                subtitle={`Categories ${collectionPath}`}
            />
            <CategoriesWrapper />
        </div>
    );
}
