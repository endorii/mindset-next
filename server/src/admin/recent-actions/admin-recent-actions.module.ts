import { Module } from "@nestjs/common";
import { AdminRecentActionsService } from "./admin-recent-actions.service";
import { AdminRecentActionsController } from "./admin-recent-actions.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [AdminRecentActionsController],
    providers: [AdminRecentActionsService, PrismaService],
})
export class AdminRecentActionsModule {}
