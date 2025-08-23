import ProductsWrapper from "@/features/products/components/ProductsWrapper";
import ShopTitle from "@/shared/ui/titles/ShopTitle";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ categoriesSlug: string; productsSlug: string }>;
}) {
    const { categoriesSlug, productsSlug } = await params;

    return (
        <div className="flex flex-col gap-[50px]">
            <ShopTitle
                title={`Товари ${categoriesSlug} / ${productsSlug}`}
                subtitle={`Products ${categoriesSlug} / ${productsSlug}`}
            />
            {/* ProductsWrapper має бути client component */}
            <ProductsWrapper
                collectionPath={categoriesSlug}
                categoryPath={productsSlug}
            />
        </div>
    );
}
