import { Module } from "@nestjs/common";
import { AdminProductsService } from "./admin-products.service";
import { AdminProductsController } from "./admin-products.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Module({
    controllers: [AdminProductsController],
    providers: [AdminProductsService, PrismaService, AdminRecentActionsService],
})
export class AdminProductsModule {}
