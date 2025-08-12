import { Module } from "@nestjs/common";
import { ShopOrdersService } from "./shop-orders.service";
import { ShopOrdersController } from "./shop-orders.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ShopCartService } from "../cart/shop-cart.service";

@Module({
    controllers: [ShopOrdersController],
    providers: [ShopOrdersService, PrismaService, ShopCartService],
})
export class ShopOrdersModule {}
