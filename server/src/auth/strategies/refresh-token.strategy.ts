import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import type { AuthJwtPayload } from "../types/auth-jwtPayload";
import { AuthService } from "../auth.service";
import refreshConfig from "../config/refresh.config";
import { Request } from "express";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh-jwt") {
    constructor(
        @Inject(refreshConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshConfig>,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    let token: string | null = null;
                    if (req && req.cookies && typeof req.cookies["refreshToken"] === "string") {
                        token = req.cookies["refreshToken"];
                    }
                    return token;
                },
            ]),
            secretOrKey: refreshTokenConfig.secret,
            ignoreExpiration: false,
            passReqToCallback: true,
        } as StrategyOptionsWithRequest);
    }

    validate(req: Request, payload: AuthJwtPayload) {
        const userId = payload.sub;
        const refreshToken: string = req.cookies["refreshToken"] as string;
        if (!refreshToken || typeof refreshToken !== "string") {
            throw new UnauthorizedException("Refresh token not found or invalid");
        }
        return this.authService.validateRefreshToken(userId, refreshToken);
    }
}
