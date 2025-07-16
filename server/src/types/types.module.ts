import { Module } from "@nestjs/common";
import { TypesService } from "./types.service";
import { TypesController } from "./types.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { RecentActionsService } from "src/recent-actions/recent-actions.service";

@Module({
    controllers: [TypesController],
    providers: [TypesService, PrismaService, RecentActionsService],
})
export class TypesModule {}
