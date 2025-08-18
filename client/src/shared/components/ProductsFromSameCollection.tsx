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
        isError: isProductsFromSameCollectionError,
    } = useProductsFromSameCollection(collectionId);

    return collectionId && productsFromSameCollection ? (
        <SliderWrapper
            productsList={productsFromSameCollection}
            isProductsListPending={isProductsFromSameCollectionPending}
            isProductsListError={isProductsFromSameCollectionError}
            title={"Товари з цієї ж колекції"}
            emptyProductsTitle={"Товари з цієї ж колекції відсутні"}
        />
    ) : isProductsFromSameCollectionPending ? (
        <ProductsSliderSkeleton />
    ) : isProductsFromSameCollectionError ? (
        <div>Виникла помилка під час отримання списку товарів</div>
    ) : (
        <div>Не вдалося отримати список товарів</div>
    );
}

export default ProductsFromSameCollection;
