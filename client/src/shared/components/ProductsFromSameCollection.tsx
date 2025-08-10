import { useProductsFromSameCollection } from "@/features/products/hooks/useProducts";
import SliderWrapper from "./layout/SliderWrapper";

interface ProductsFromSameCategoryProps {
    collectionId: string | undefined;
}

function ProductsFromSameCollection({
    collectionId,
}: ProductsFromSameCategoryProps) {
    const { data: productsFromSameCollection } = useProductsFromSameCollection(
        collectionId!
    );

    if (!productsFromSameCollection) return <div>Товари вісутні</div>;

    return (
        <SliderWrapper
            productsList={productsFromSameCollection}
            title={"Товари з цієї ж колекції"}
            emptyProductsTitle={"Товари з цієї ж колекції відсутні"}
        />
    );
}

export default ProductsFromSameCollection;
