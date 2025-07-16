import { Module } from "@nestjs/common";
import { ColorsService } from "./colors.service";
import { ColorsController } from "./colors.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { RecentActionsService } from "src/recent-actions/recent-actions.service";

@Module({
    controllers: [ColorsController],
    providers: [ColorsService, PrismaService, RecentActionsService],
})
export class ColorsModule {}
