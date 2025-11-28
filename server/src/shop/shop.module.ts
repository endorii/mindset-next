import { Module } from "@nestjs/common";

import { EmailModule } from "src/email/email.module";
import { PrismaModule } from "../prisma/prisma.module";
import { ShopCartModule } from "./cart/shop-cart.module";
import { ShopCollectionsModule } from "./collections/shop-collections.module";
import { ShopFavoritesModule } from "./favorites/shop-favorites.module";
import { ShopOrdersModule } from "./orders/shop-orders.module";
import { ShopProductsModule } from "./products/shop-products.module";
import { ShopReviewsModule } from "./reviews/shop-reviews.module";
import { ShopUserAddressModule } from "./user-address/shop-user-address.module";
import { ShopUserModule } from "./user/shop-user.module";

@Module({
    imports: [
        PrismaModule,
        ShopCollectionsModule,
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
