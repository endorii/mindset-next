import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { ShopCollectionsModule } from "./collections/shop-collections.module";
import { ShopCategoriesModule } from "./categories/shop-categories.module";
import { ShopProductsModule } from "./products/shop-products.module";
import { ShopCartModule } from "./cart/shop-cart.module";
import { ShopFavoritesModule } from "./favorites/shop-favorites.module";
import { ShopUserModule } from "./user/shop-user.module";
import { ShopUserAddressModule } from "./user-address/shop-user-address.module";
import { ShopOrdersModule } from "./orders/shop-orders.module";
import { ShopReviewsModule } from "./reviews/shop-reviews.module";
import { EmailModule } from "src/email/email.module";

@Module({
    imports: [
        PrismaModule,
        ShopCollectionsModule,
        ShopCategoriesModule,
        ShopProductsModule,
        ShopCartModule,
        ShopFavoritesModule,
        ShopUserModule,
        ShopUserAddressModule,
        ShopOrdersModule,
        ShopReviewsModule,
        EmailModule,
    ],
})
export class ShopModule {}
