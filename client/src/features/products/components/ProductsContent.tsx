import { IProduct } from "../types/products.types";
import { ProductCard } from "./ProductCard";

export function ProductsContent({
    collectionPath,
    categoryPath,
    products,
}: {
    collectionPath: string;
    categoryPath: string;
    products: IProduct[];
}) {
    return (
        <>
            <ul className="grid gap-[15px] w-full px-[30px] grid-cols-4 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {products.map((product) => (
                    <li key={product.id} className="w-full">
                        <ProductCard
                            product={product}
                            path={`/${collectionPath}/${categoryPath}/${product.path}`}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
