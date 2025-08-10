import { Module } from "@nestjs/common";
import { ProductsService } from "./shop-products.service";

import { PrismaService } from "src/prisma/prisma.service";
import { ShopProductsController } from "./shop-products.controller";

@Module({
    controllers: [ShopProductsController],
    providers: [ProductsService, PrismaService],
})
export class ShopProductsModule {}
