import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RevalidateService } from "src/revalidate/revalidate.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { AdminProductsController } from "./admin-products.controller";
import { AdminProductsService } from "./admin-products.service";

@Module({
    controllers: [AdminProductsController],
    providers: [AdminProductsService, PrismaService, AdminRecentActionsService, RevalidateService],
})
export class AdminProductsModule {}
