import { Module } from "@nestjs/common";
import { AdminReviewsService } from "./admin-reviews.service";
import { AdminReviewsController } from "./admin-reviews.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Module({
    controllers: [AdminReviewsController],
    providers: [AdminReviewsService, PrismaService, AdminRecentActionsService],
})
export class AdminReviewsModule {}
