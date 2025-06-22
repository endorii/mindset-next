// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "YOUR_SECRET_KEY_HERE",
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.validateUserById(payload.sub);
        if (!user) {
            throw new UnauthorizedException("User not found or token invalid");
        }
        return user;
    }
}
