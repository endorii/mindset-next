import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
// import { ThrottlerModule } from "@nestjs/throttler";

import { join } from "path";

import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { EmailModule } from "./email/email.module";
import { FilesModule } from "./files/files.module";
import { MonoPayModule } from "./mono-pay/mono-pay.module";
import { NovaPostModule } from "./nova-post/nova-post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ShopModule } from "./shop/shop.module";

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
        FilesModule,
        ShopModule,
        NovaPostModule,
        MonoPayModule,
        EmailModule,
    ],
})
export class AppModule {}
