import { Controller, Get, Param } from "@nestjs/common";
import { ShopCollectionsService } from "./shop-collections.service";

import { Public } from "src/auth/decorators/public.decorator";

@Controller("shop/collections")
export class ShopCollectionsController {
    constructor(private readonly shopCollectionsService: ShopCollectionsService) {}

    @Get()
    @Public()
    getAllCollections() {
        return this.shopCollectionsService.getAllCollections();
    }

    @Get(":collectionPath")
    @Public()
    getCollectionByPath(@Param("collectionPath") collectionPath: string) {
        return this.shopCollectionsService.getCollectionByPath(collectionPath);
    }
}
