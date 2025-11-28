import { Module } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { ShopCollectionsController } from "./shop-collections.controller";
import { ShopCollectionsService } from "./shop-collections.service";

@Module({
    controllers: [ShopCollectionsController],
    providers: [ShopCollectionsService, PrismaService],
})
export class ShopCollectionsModule {}
