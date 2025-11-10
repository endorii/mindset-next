import { ErrorWithMessage } from "@/shared/ui/components";
import { IProduct } from "../types/products.types";
import ProductContent from "./ProductContent";

export default function ProductSection({
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
        return (
            <ErrorWithMessage message="Товар не знайдено, або він відсутній" />
        );
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
