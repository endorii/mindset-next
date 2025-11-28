"use client";

import { AdminCategoriesWrapper } from "@/features/categories/components/AdminCategoriesWrapper";
import { useParams } from "next/navigation";

export default function AdminCategories() {
    const params = useParams();
    const collectionSlug = Array.isArray(params?.collectionSlug)
        ? params.collectionSlug[0]
        : params?.collectionSlug;

    if (!collectionSlug) return null;

    return <AdminCategoriesWrapper collectionId={collectionSlug} />;
}
