import { Module } from "@nestjs/common";
import { AdminOrdersService } from "./admin-orders.service";
import { AdminOrdersController } from "./admin-orders.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Module({
    controllers: [AdminOrdersController],
    providers: [AdminOrdersService, PrismaService, AdminRecentActionsService],
})
export class AdminOrdersModule {}
