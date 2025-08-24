import AdminProductsWrapper from "@/features/products/components/AdminProductsWrapper";

async function AdminProducts({
    params,
}: {
    params: {
        collectionSlug: string;
        categorySlug: string;
    };
}) {
    const { collectionSlug, categorySlug } = await params;

    return (
        <AdminProductsWrapper
            collectionPath={collectionSlug}
            categoryPath={categorySlug}
        />
    );
}

export default AdminProducts;
