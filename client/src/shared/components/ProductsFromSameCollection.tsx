import { useProductsFromSameCollection } from "@/features/products/hooks/useProducts";
import SliderWrapper from "./layout/SliderWrapper";
import ProductsSliderSkeleton from "../ui/skeletons/ProductsSliderSkeleton";

interface ProductsFromSameCategoryProps {
    collectionId: string;
}

function ProductsFromSameCollection({
    collectionId,
}: ProductsFromSameCategoryProps) {
    const {
        data: productsFromSameCollection,
        isPending: isProductsFromSameCollectionPending,
    } = useProductsFromSameCollection(collectionId);

    return collectionId && productsFromSameCollection ? (
        <SliderWrapper
            productsList={productsFromSameCollection}
            title={"Товари з цієї ж колекції"}
        />
    ) : isProductsFromSameCollectionPending ? (
        <ProductsSliderSkeleton />
    ) : (
        <div>Список товарів порожній</div>
    );
}

export default ProductsFromSameCollection;
