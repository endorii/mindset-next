import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ShopUserService } from "src/shop/user/shop-user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import jwtConfig from "./config/jwt.config";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import refreshConfig from "./config/refresh.config";
import { RefreshStrategy } from "./strategies/refresh-token.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "./guards/roles/roles.guard";
import { EmailModule } from "src/email/email.module";
import { CleanupService } from "./clean-up.service";

@Module({
    imports: [
        JwtModule.registerAsync(jwtConfig.asProvider()),
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(refreshConfig),
        EmailModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        CleanupService,
        ShopUserService,
        PrismaService,
        LocalStrategy,
        JwtStrategy,
        RefreshStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AuthModule {}
