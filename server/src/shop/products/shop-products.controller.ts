import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "./shop-products.service";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("shop/products")
export class ShopProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get("popular")
    @Public()
    getPopularProducts() {
        return this.productsService.getPopularProducts();
    }

    @Get("collections/:collectionId")
    @Public()
    getProductsFromCollection(@Param("collectionId") collectionId: string) {
        return this.productsService.getProductsFromCollection(collectionId);
    }

    @Get("categories/:categoryId")
    @Public()
    getProductsByCategoryId(@Param("categoryId") categoryId: string) {
        return this.productsService.getProductsByCategoryId(categoryId);
    }

    @Get(":collectionPath/:categoryPath/:productPath")
    @Public()
    getProductByPath(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Param("productPath") productPath: string
    ) {
        return this.productsService.getProductByPath(collectionPath, categoryPath, productPath);
    }
}
