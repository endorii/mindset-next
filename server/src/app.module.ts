import { Module } from "@nestjs/common";
import { CollectionsModule } from "./collections/collections.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ImagesModule } from "./images/images.module";
import { TypesModule } from "./types/types.module";
import { ColorsModule } from "./colors/colors.module";
import { SizesModule } from "./sizes/sizes.module";
import { UserAddressModule } from "./user-address/user-address.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
// import { ThrottlerModule } from "@nestjs/throttler";

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
        PrismaModule,
        CategoriesModule,
        ProductsModule,
        ImagesModule,
        TypesModule,
        ColorsModule,
        SizesModule,
        UserModule,
        AuthModule,
        UserAddressModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
