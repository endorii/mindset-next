import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import { RevalidateService } from "src/revalidate/revalidate.service";
import { AdminCategoriesService } from "../categories/admin-categories.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { AdminCollectionsController } from "./admin-collections.controller";
import { AdminCollectionsService } from "./admin-collections.service";

@Module({
    controllers: [AdminCollectionsController],
    providers: [
        AdminCollectionsService,
        AdminCategoriesService,
        PrismaService,
        AdminRecentActionsService,
        ConfigService,
        RevalidateService,
    ],
})
export class AdminCollectionsModule {}
