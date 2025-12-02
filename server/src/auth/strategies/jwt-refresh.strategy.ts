import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { extractRefreshTokenFromCookie } from "../helpers/extractJWTFromCookie";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: extractRefreshTokenFromCookie,
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("REFRESH_TOKEN_SECRET")!,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: { sub: string }) {
        const refreshToken = String(req.cookies?.refreshToken);

        if (!refreshToken) {
            throw new UnauthorizedException("Refresh token is missing");
        }
        console.log("Cookies in JwtRefreshStrategy:", req.cookies);
        console.log("refreshToken from cookie:", req.cookies?.refreshToken);

        const user = await this.authService.validateRefreshToken(payload.sub, refreshToken);

        return { id: user.id, refreshToken }; // Return userId and the token
    }
}
