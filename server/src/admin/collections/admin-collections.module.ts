import { Module } from "@nestjs/common";
import { AdminCollectionsController } from "./admin-collections.controller";
import { AdminCollectionsService } from "./admin-collections.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { ConfigService } from "@nestjs/config";

@Module({
    controllers: [AdminCollectionsController],
    providers: [AdminCollectionsService, PrismaService, AdminRecentActionsService, ConfigService],
})
export class AdminCollectionsModule {}
