import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { RevalidateService } from "src/revalidate/revalidate.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { AdminCollectionsController } from "./admin-collections.controller";
import { AdminCollectionsService } from "./admin-collections.service";

@Module({
    controllers: [AdminCollectionsController],
    providers: [
        AdminCollectionsService,
        PrismaService,
        AdminRecentActionsService,
        ConfigService,
        RevalidateService,
    ],
})
export class AdminCollectionsModule {}
