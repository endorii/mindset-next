import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { RecentActionsService } from "src/recent-actions/recent-actions.service";

@Module({
    controllers: [ReviewsController],
    providers: [ReviewsService, PrismaService, RecentActionsService],
})
export class ReviewsModule {}
