import { Module } from "@nestjs/common";
import { AdminTypesService } from "./admin-types.service";
import { AdminTypesController } from "./admin-types.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Module({
    controllers: [AdminTypesController],
    providers: [AdminTypesService, PrismaService, AdminRecentActionsService],
})
export class AdminTypesModule {}
