import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
// import { ThrottlerModule } from "@nestjs/throttler";

import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { EmailModule } from "./email/email.module";
import { FilesModule } from "./files/files.module";
import { NovaPostModule } from "./nova-post/nova-post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ShopModule } from "./shop/shop.module";
import { StripeModule } from './stripe/stripe.module';
import { RevalidateModule } from './revalidate/revalidate.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // ThrottlerModule.forRoot({
        //     ttl: 60,
        //     limit: 10,
        // }),
        AdminModule,
        PrismaModule,
        AuthModule,
        FilesModule,
        ShopModule,
        NovaPostModule,
        EmailModule,
        StripeModule,
        RevalidateModule,
    ],
})
export class AppModule {}
