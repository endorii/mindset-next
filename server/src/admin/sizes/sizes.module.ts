import { Module } from "@nestjs/common";
import { AdminSizesService } from "./sizes.service";
import { AdminSizesController } from "./sizes.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Module({
    controllers: [AdminSizesController],
    providers: [AdminSizesService, PrismaService, AdminRecentActionsService],
})
export class AdminSizesModule {}
