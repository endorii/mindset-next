import { Module } from "@nestjs/common";
import { ShopUserAddressService } from "./shop-user-address.service";
import { ShopUserAddressController } from "./shop-user-address.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [ShopUserAddressController],
    providers: [ShopUserAddressService, PrismaService],
})
export class ShopUserAddressModule {}
