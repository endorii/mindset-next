import { usePopularProducts } from "@/features/products/hooks/useProducts";
import SliderWrapper from "./layout/SliderWrapper";
import ProductsSliderSkeleton from "../ui/skeletons/ProductsSliderSkeleton";
import { ErrorWithMessage } from "../ui/components";

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
        />
    ) : isPopularProductsPending ? (
        <ProductsSliderSkeleton />
    ) : isPopularProductsError ? (
        <ErrorWithMessage message="Виникла помилка під час завантаження популярних товарів" />
    ) : (
        <div>Список товарів порожній</div>
    );
}

export default PopularProducts;
