import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { RecentActionsService } from "src/recent-actions/recent-actions.service";

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, PrismaService, RecentActionsService],
})
export class OrdersModule {}
