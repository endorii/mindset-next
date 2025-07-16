import { Module } from "@nestjs/common";
import { SizesService } from "./sizes.service";
import { SizesController } from "./sizes.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { RecentActionsService } from "src/recent-actions/recent-actions.service";

@Module({
    controllers: [SizesController],
    providers: [SizesService, PrismaService, RecentActionsService],
})
export class SizesModule {}
