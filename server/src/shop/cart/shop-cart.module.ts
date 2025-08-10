import { Module } from "@nestjs/common";
import { ShopCartService } from "./shop-cart.service";
import { ShopCartController } from "./shop-cart.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [ShopCartController],
    providers: [ShopCartService, PrismaService],
})
export class ShopCartModule {}
