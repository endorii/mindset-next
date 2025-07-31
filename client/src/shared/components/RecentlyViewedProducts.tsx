import SliderWrapper from "./layout/SliderWrapper";
import { IProduct } from "@/features/products/types/products.types";

function RecentlyViewedProducts() {
    function getRecentlyViewed(): IProduct[] {
        return JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    }

    const recentlyViewedProductsList = getRecentlyViewed();

    if (!recentlyViewedProductsList) return;

    return (
        <SliderWrapper
            productsList={recentlyViewedProductsList}
            title={"Останні переглянуті"}
            emptyProductsTitle={"Ще немає переглянутих товарів"}
        />
    );
}

export default RecentlyViewedProducts;
