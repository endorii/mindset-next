import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, "jwt-access") {
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("ACCESS_TOKEN_SECRET")!,
        });
    }

    async validate(payload: { sub: string }) {
        // payload.sub це userId з JWT
        const user = await this.authService.validateJwtUser(payload.sub);
        if (!user) {
            throw new UnauthorizedException("Користувача не знайдено");
        }
        return user; // Повертає { id, role }
    }
}
