import { Module } from "@nestjs/common";
import { RevalidateService } from "src/revalidate/revalidate.service";
import { AdminProductsService } from "../products/admin-products.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";
import { AdminCategoriesController } from "./admin-categories.controller";
import { AdminCategoriesService } from "./admin-categories.service";

@Module({
    controllers: [AdminCategoriesController],
    providers: [
        AdminCategoriesService,
        AdminProductsService,
        AdminRecentActionsService,
        RevalidateService,
    ],
})
export class AdminCategoriesModule {}
