import { Module } from "@nestjs/common";
import { CollectionsController } from "./collections/collections.controller";
import { CollectionsService } from "./collections/collections.service";
import { PrismaService } from "./prisma.service";

@Module({
    imports: [],
    controllers: [CollectionsController],
    providers: [CollectionsService, PrismaService],
})
export class AppModule {}
