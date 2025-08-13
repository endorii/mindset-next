import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
// import { ThrottlerModule } from "@nestjs/throttler";

import { join } from "path";

import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ShopModule } from "./shop/shop.module";
import { AdminModule } from "./admin/admin.module";
import { ImagesModule } from "./images/images.module";
import { NovaPostModule } from "./nova-post/nova-post.module";
import { MonoPayModule } from './mono-pay/mono-pay.module';

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

        AdminModule,
        PrismaModule,
        AuthModule,
        ImagesModule,
        ShopModule,
        NovaPostModule,
        MonoPayModule,
    ],
})
export class AppModule {}
