import { usePopularProducts } from "@/features/products/hooks/useProducts";
import SliderWrapper from "./layout/SliderWrapper";
import ProductsSliderSkeleton from "../ui/skeletons/ProductsSliderSkeleton";

function PopularProducts() {
    const { data: popularProducts, isPending: isPopularProductsPending } =
        usePopularProducts();

    return popularProducts ? (
        <SliderWrapper
            productsList={popularProducts}
            title={"Найбільш популярні товари"}
        />
    ) : isPopularProductsPending ? (
        <ProductsSliderSkeleton />
    ) : (
        <div>Список товарів порожній</div>
    );
}

export default PopularProducts;
