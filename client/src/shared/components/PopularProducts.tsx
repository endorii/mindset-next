import { usePopularProducts } from "@/features/products/hooks/useProducts";
import SliderWrapper from "./layout/SliderWrapper";

function PopularProducts() {
    const { data: popularProducts } = usePopularProducts();

    console.log(popularProducts);

    return popularProducts ? (
        <SliderWrapper
            productsList={popularProducts}
            title={"Найбільш популярні товари"}
            emptyProductsTitle={"Популярні товари відсутні"}
        />
    ) : null;
}

export default PopularProducts;
