import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";

import { Public } from "src/auth/decorators/public.decorator";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";

@Controller("products")
@UseGuards(RolesGuard)
export class ProductsPublicController {
    constructor(private readonly productsService: ProductsService) {}

    @Get("popular")
    @Public()
    getPopularProducts() {
        return this.productsService.getPopularProducts();
    }

    @Get("collections/:collectionPath")
    @Public()
    getProductsFromCollection(@Param(":collectionPath") collectionPath: string) {
        return this.productsService.getProductsFromCollection(collectionPath);
    }
}
