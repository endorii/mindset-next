import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { RecentActionsService } from "src/recent-actions/recent-actions.service";

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, PrismaService, RecentActionsService],
})
export class ProductsModule {}
