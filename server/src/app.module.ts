import { Module } from "@nestjs/common";
import { CollectionsModule } from "./collections/collections.module";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { TypesModule } from "./types/types.module";
import { ColorsModule } from "./colors/colors.module";
import { SizesModule } from "./sizes/sizes.module";
import { UserModule } from "./user/user.module";
import { UserAddressModule } from "./user-address/user-address.module";
import { ImagesModule } from "./images/images.module";
import { AuthModule } from "./auth/auth.module";

import { PrismaModule } from "./prisma/prisma.module";

import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { ConfigModule } from "@nestjs/config";

// import { ThrottlerModule } from "@nestjs/throttler";
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RecentActionsModule } from './recent-actions/recent-actions.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // ThrottlerModule.forRoot({
        //     ttl: 60,
        //     limit: 10,
        // }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
        }),
        CollectionsModule,
        CategoriesModule,
        ProductsModule,
        TypesModule,
        ColorsModule,
        SizesModule,
        PrismaModule,
        UserModule,
        UserAddressModule,
        AuthModule,
        ImagesModule,
        CartModule,
        FavoritesModule,
        RecentActionsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
