import { Module } from "@nestjs/common";

import { ShopCollectionsController } from "./shop-collections.controller";
import { ShopCollectionsService } from "./shop-collections.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [ShopCollectionsController],
    providers: [ShopCollectionsService, PrismaService],
})
export class ShopCollectionsModule {}
