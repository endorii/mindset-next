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

    @Get("by-ids")
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

    @Get(":productId/colors")
    @Public()
    getProductColors(@Param("productId") productId: string) {
        return this.productsService.getProductColors(productId);
    }

    @Get(":productId/types")
    @Public()
    getProductTypes(@Param("productId") productId: string) {
        return this.productsService.getProductTypes(productId);
    }

    @Get(":productId/sizes")
    @Public()
    getProductSizes(@Param("productId") productId: string) {
        return this.productsService.getProductSizes(productId);
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
