"use client";

import { AdminProductsWrapper } from "@/features/products/components/AdminProductsWrapper";
import { useParams } from "next/navigation";

export default function AdminProducts() {
    const params = useParams();

    const collectionSlug = Array.isArray(params?.collectionSlug)
        ? params.collectionSlug[0]
        : params?.collectionSlug;

    const categorySlug = Array.isArray(params?.categorySlug)
        ? params.categorySlug[0]
        : params?.categorySlug;

    if (!collectionSlug || !categorySlug) return null;

    return (
        <AdminProductsWrapper
            collectionPath={collectionSlug}
            categoryPath={categorySlug}
        />
    );
}
