import { ErrorWithMessage } from "@/shared/ui/components";
import { IProduct } from "../types/products.types";
import { ProductContent } from "./ProductContent";

export function ProductSection({
    collectionPath,
    categoryPath,
    productPath,
    product,
}: {
    collectionPath: string;
    categoryPath: string;
    productPath: string;
    product: IProduct | null | undefined;
}) {
    if (!product) {
        return <ErrorWithMessage message="Product not found or missing" />;
        // notFound();
    }

    return (
        <ProductContent
            collectionPath={collectionPath}
            categoryPath={categoryPath}
            productPath={productPath}
            product={product}
        />
    );
}
