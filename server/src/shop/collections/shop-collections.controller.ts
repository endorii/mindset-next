import { Controller, Get, Param } from "@nestjs/common";
import { ShopCollectionsService } from "./shop-collections.service";

import { Public } from "src/auth/decorators/public.decorator";

@Controller("shop/collections")
@Public()
export class ShopCollectionsController {
    constructor(private readonly shopCollectionsService: ShopCollectionsService) {}

    @Get()
    getCollections() {
        return this.shopCollectionsService.getCollections();
    }

    @Get(":collectionPath")
    getCollectionByPath(@Param("collectionPath") collectionPath: string) {
        return this.shopCollectionsService.getCollectionByPath(collectionPath);
    }

    @Get(":collectionPath/categories/:categoryPath")
    getCategoryByPath(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string
    ) {
        return this.shopCollectionsService.getCategoryByPath(collectionPath, categoryPath);
    }

    @Get(":collectionPath/categories/:categoryPath/products/:productPath")
    getProductByPath(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string,
        @Param("productPath") productPath: string
    ) {
        return this.shopCollectionsService.getProductByPath(
            collectionPath,
            categoryPath,
            productPath
        );
    }
}
