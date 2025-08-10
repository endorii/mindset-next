import { Module } from "@nestjs/common";
import { ShopOrdersService } from "./shop-orders.service";
import { ShopOrdersController } from "./shop-orders.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [ShopOrdersController],
    providers: [ShopOrdersService, PrismaService],
})
export class ShopOrdersModule {}
