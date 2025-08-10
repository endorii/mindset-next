import { Module } from "@nestjs/common";
import { ShopReviewsService } from "./shop-reviews.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ShopReviewsController } from "./shop-reviews.controller";

@Module({
    controllers: [ShopReviewsController],
    providers: [ShopReviewsService, PrismaService],
})
export class ShopReviewsModule {}
