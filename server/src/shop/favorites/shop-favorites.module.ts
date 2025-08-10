import { Module } from "@nestjs/common";
import { ShopFavoritesService } from "./shop-favorites.service";
import { ShopFavoritesController } from "./shop-favorites.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [ShopFavoritesController],
    providers: [ShopFavoritesService, PrismaService],
})
export class ShopFavoritesModule {}
