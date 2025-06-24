import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { AppUser } from "src/user/types/user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        private readonly usersService: UserService,
        readonly configService: ConfigService
    ) {
        const jwtSecret = configService.get<string>("JWT_SECRET");
        if (!jwtSecret) {
            throw new Error("JWT_SECRET не знайдено в конфігурації");
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: { userId: string }): Promise<AppUser> {
        const user = await this.usersService.findOne(payload.userId);
        if (!user) {
            throw new UnauthorizedException("Користувача не знайдено");
        }
        return user;
    }
}
