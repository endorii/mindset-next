import { Module } from "@nestjs/common";
import { RevalidateService } from "src/revalidate/revalidate.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { AdminCategoriesController } from "./admin-categories.controller";
import { AdminCategoriesService } from "./admin-categories.service";

@Module({
    controllers: [AdminCategoriesController],
    providers: [AdminCategoriesService, AdminRecentActionsService, RevalidateService],
})
export class AdminCategoriesModule {}
