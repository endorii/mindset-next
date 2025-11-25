import { Module } from "@nestjs/common";
import { EmailService } from "src/email/email.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ShopCartService } from "../cart/shop-cart.service";
import { ShopOrdersController } from "./shop-orders.controller";
import { ShopOrdersService } from "./shop-orders.service";

@Module({
    controllers: [ShopOrdersController],
    providers: [ShopOrdersService, PrismaService, ShopCartService, EmailService],
})
export class ShopOrdersModule {}
