import SliderWrapper from "./layout/SliderWrapper";
import { useProductsFromOneCollection } from "@/features/products/hooks/useProducts";

interface ProductsFromOneCategoryProps {
    collectionPath: string;
}

function ProductsFromOneCategory({
    collectionPath,
}: ProductsFromOneCategoryProps) {
    const { data: productsFromCollection } =
        useProductsFromOneCollection(collectionPath);

    if (!productsFromCollection) return <div>Товари вісутні</div>;

    return (
        <SliderWrapper
            productsList={productsFromCollection}
            title={"Товари з цієї ж колекції"}
            emptyProductsTitle={"Товари з цієї ж колекції відсутні"}
        />
    );
}

export default ProductsFromOneCategory;
