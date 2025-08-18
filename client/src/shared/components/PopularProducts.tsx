import { usePopularProducts } from "@/features/products/hooks/useProducts";
import SliderWrapper from "./layout/SliderWrapper";

function PopularProducts() {
    const {
        data: popularProducts,
        isPending: isPopularProductsPending,
        isError: isPopularProductsError,
    } = usePopularProducts();

    return popularProducts ? (
        <SliderWrapper
            productsList={popularProducts}
            title={"Найбільш популярні товари"}
            emptyProductsTitle={"Популярні товари відсутні"}
            isProductsListPending={isPopularProductsPending}
            isProductsListError={isPopularProductsError}
        />
    ) : null;
}

export default PopularProducts;
