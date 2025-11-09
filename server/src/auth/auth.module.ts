import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { EmailModule } from "src/email/email.module";
import { PrismaService } from "src/prisma/prisma.service";
import { ShopUserService } from "src/shop/user/shop-user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CleanupService } from "./clean-up.service";
import { JwtAccessGuard } from "./guards/jwt/jwt-access.guard";
// import { RolesGuard } from "./guards/roles/roles.guard";
import { RolesGuard } from "./guards/roles/roles.guard";
import { GoogleStrategy } from "./strategies/google.strategy";
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [ConfigModule, PassportModule, EmailModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        CleanupService,
        ShopUserService,
        PrismaService,
        LocalStrategy,
        JwtAccessStrategy,
        JwtRefreshStrategy,
        GoogleStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAccessGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        {
            provide: "JWT_ACCESS_SERVICE",
            useFactory: (config: ConfigService) => {
                return new JwtService({
                    secret: config.get<string>("ACCESS_TOKEN_SECRET"),
                    signOptions: { expiresIn: config.get<string>("ACCESS_TOKEN_EXPIRES") || "15m" },
                });
            },
            inject: [ConfigService],
        },

        {
            provide: "JWT_REFRESH_SERVICE",
            useFactory: (config: ConfigService) => {
                return new JwtService({
                    secret: config.get<string>("REFRESH_TOKEN_SECRET"),
                    signOptions: { expiresIn: config.get<string>("REFRESH_TOKEN_EXPIRES") || "7d" },
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: ["JWT_ACCESS_SERVICE", "JWT_REFRESH_SERVICE"],
})
export class AuthModule {}
