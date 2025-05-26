import { Module } from "@nestjs/common";
import { CollectionsModule } from "./collections/collections.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CategoriesModule } from "./categories/categories.module";

@Module({
    imports: [CollectionsModule, PrismaModule, CategoriesModule],
})
export class AppModule {}
