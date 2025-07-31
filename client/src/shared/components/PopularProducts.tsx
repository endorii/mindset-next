import { usePopularProducts } from "@/features/products/hooks/useProducts";
import SliderWrapper from "./layout/SliderWrapper";

function PopularProducts() {
    const { data: popularProducts } = usePopularProducts();

    if (!popularProducts) return <div>Товари вісутні</div>;

    return (
        <SliderWrapper
            productsList={popularProducts}
            title={"Найбільш популярні товари"}
            emptyProductsTitle={"Популярні товари відсутні"}
        />
    );
}

export default PopularProducts;
