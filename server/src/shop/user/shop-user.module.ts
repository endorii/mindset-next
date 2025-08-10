import { Module } from "@nestjs/common";
import { ShopUserService } from "./shop-user.service";
import { ShopUserController } from "./shop-user.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [ShopUserController],
    providers: [ShopUserService, PrismaService],
})
export class ShopUserModule {}
