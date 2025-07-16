import { Module } from "@nestjs/common";
import { RecentActionsService } from "./recent-actions.service";
import { RecentActionsController } from "./recent-actions.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [RecentActionsController],
    providers: [RecentActionsService, PrismaService],
})
export class RecentActionsModule {}
