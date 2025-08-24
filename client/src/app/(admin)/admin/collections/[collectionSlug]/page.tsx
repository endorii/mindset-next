import AdminCategoriesWrapper from "@/features/categories/components/AdminCategoriesWrapper";

async function AdminCategories({
    params,
}: {
    params: { collectionSlug: string };
}) {
    const { collectionSlug } = await params;
    return <AdminCategoriesWrapper collectionPath={collectionSlug} />;
}

export default AdminCategories;
