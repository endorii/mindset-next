import { Controller, Get, Param, Query } from "@nestjs/common";
import { Public } from "src/auth/decorators/public.decorator";
import { ProductsService } from "./shop-products.service";

@Controller("shop/products")
export class ShopProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @Public()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Get()
    @Public()
    getProductsByIds(@Query("ids") ids: string) {
        if (!ids) return [];

        const idArray = ids.split(",");
        return this.productsService.findByIds(idArray);
    }

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
