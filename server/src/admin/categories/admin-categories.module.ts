import { Module } from "@nestjs/common";
import { AdminCategoriesService } from "./admin-categories.service";
import { AdminCategoriesController } from "./admin-categories.controller";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Module({
    controllers: [AdminCategoriesController],
    providers: [AdminCategoriesService, AdminRecentActionsService],
})
export class AdminCategoriesModule {}
