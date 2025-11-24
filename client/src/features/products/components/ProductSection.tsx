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
    product: IProduct;
}) {
    return (
        <ProductContent
            collectionPath={collectionPath}
            categoryPath={categoryPath}
            productPath={productPath}
            product={product}
        />
    );
}
