import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import jwtConfig from "../config/jwt.config";
import type { AuthJwtPayload } from "../types/auth-jwtPayload";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(jwtConfig.KEY)
        private jwtConfiguration: ConfigType<typeof jwtConfig>,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    let token: string | null = null;
                    if (req && req.cookies && typeof req.cookies["accessToken"] === "string") {
                        token = req.cookies["accessToken"];
                    }
                    return token;
                },
            ]),
            secretOrKey: jwtConfiguration.secret!,
            ignoreExpiration: false,
        });
    }

    validate(payload: AuthJwtPayload) {
        const userId = payload.sub;
        return this.authService.validateJwtUser(userId);
    }
}
