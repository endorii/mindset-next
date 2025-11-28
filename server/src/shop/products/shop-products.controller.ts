import { Controller, Get, Param, Query } from "@nestjs/common";
import { Public } from "src/auth/decorators/public.decorator";
import { ProductsService } from "./shop-products.service";

@Controller("shop/products")
@Public()
export class ShopProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get("utils/by-ids")
    getProductsByIds(@Query("ids") ids: string) {
        if (!ids) return [];
        const idArray = ids.split(",");
        return this.productsService.findByIds(idArray);
    }

    @Get("utils/popular")
    getPopularProducts() {
        return this.productsService.getPopularProducts();
    }

    @Get("utils/collections/:collectionId")
    getProductsFromCollection(@Param("collectionId") collectionId: string) {
        return this.productsService.getProductsFromCollection(collectionId);
    }

    @Get("utils/categories/:categoryId")
    getProductsByCategoryId(@Param("categoryId") categoryId: string) {
        return this.productsService.getProductsByCategoryId(categoryId);
    }

    @Get(":productId/colors")
    getProductColors(@Param("productId") productId: string) {
        return this.productsService.getProductColors(productId);
    }

    @Get(":productId/types")
    getProductTypes(@Param("productId") productId: string) {
        return this.productsService.getProductTypes(productId);
    }

    @Get(":productId/sizes")
    getProductSizes(@Param("productId") productId: string) {
        return this.productsService.getProductSizes(productId);
    }
}
