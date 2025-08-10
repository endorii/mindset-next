import { Module } from "@nestjs/common";
import { AdminColorsService } from "./admin-colors.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { AdminColorsController } from "./admin-colors.controller";

@Module({
    controllers: [AdminColorsController],
    providers: [AdminColorsService, PrismaService, AdminRecentActionsService],
})
export class AdminColorsModule {}
