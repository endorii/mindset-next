import { Module } from "@nestjs/common";
import { CollectionsModule } from "./collections/collections.module";
import { CollectionsService } from "./collections/collections.service";
import { CollectionsController } from "./collections/collections.controller";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
    imports: [CollectionsModule, PrismaModule],
    controllers: [CollectionsController],
    providers: [CollectionsService],
})
export class AppModule {}
