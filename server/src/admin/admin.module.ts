import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AdminCollectionsModule } from "./collections/admin-collections.module";
import { AdminUserModule } from "./user/admin-user.module";
import { AdminCategoriesModule } from "./categories/admin-categories.module";
import { AdminRecentActionsModule } from "./recent-actions/admin-recent-actions.module";
import { AdminColorsModule } from "./colors/admin-colors.module";
import { AdminTypesModule } from "./types/admin-types.module";
import { AdminSizesModule } from "./sizes/admin-sizes.module";
import { AdminProductsModule } from "./products/admin-products.module";
import { AdminOrdersModule } from "./orders/admin-orders.module";
import { AdminReviewsModule } from "./reviews/admin-reviews.module";
import { AdminTodoModule } from "./todo/admin-todo.module";

@Module({
    imports: [
        PrismaModule,
        AdminRecentActionsModule,
        AdminUserModule,
        AdminCollectionsModule,
        AdminCategoriesModule,
        AdminProductsModule,
        AdminColorsModule,
        AdminTypesModule,
        AdminSizesModule,
        AdminOrdersModule,
        AdminReviewsModule,
        AdminTodoModule,
    ],
})
export class AdminModule {}
