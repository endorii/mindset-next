import { Controller, Param, Get } from "@nestjs/common";

import { Public } from "src/auth/decorators/public.decorator";

import { ShopCategoriesService } from "./shop-categories.service";

@Controller("shop/categories")
export class ShopCategoriesController {
    constructor(private readonly categoriesService: ShopCategoriesService) {}

    @Get(":collectionId")
    @Public()
    getCategoriesByCollectionId(@Param("collectionId") collectionId: string) {
        return this.categoriesService.getCategoriesByCollectionId(collectionId);
    }

    @Get(":collectionPath/:categoryPath")
    @Public()
    getCategoryByPath(
        @Param("collectionPath") collectionPath: string,
        @Param("categoryPath") categoryPath: string
    ) {
        return this.categoriesService.getCategoryByPath(collectionPath, categoryPath);
    }
}
