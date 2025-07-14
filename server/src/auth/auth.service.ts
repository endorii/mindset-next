import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import type { AuthJwtPayload } from "./types/auth-jwtPayload";
import { JwtService } from "@nestjs/jwt";
import refreshConfig from "./config/refresh.config";
import { ConfigType } from "@nestjs/config";
import { Role } from "generated/prisma";
import * as bcrypt from "bcryptjs";
import { Response } from "express";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(refreshConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshConfig>
    ) {}

    async registerUser(createUserDto: CreateUserDto) {
        const user = await this.userService.findByEmail(createUserDto.email);
        if (user) throw new ConflictException("Користувач з такою електронною адресою вже існує");
        return this.userService.create(createUserDto);
    }

    async login(userId: string, name: string, role: Role, res: Response) {
        const { accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRT = await bcrypt.hash(refreshToken, 10);
        await this.userService.updateHashedRefreshToken(userId, hashedRT);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(Date.now() + 30 * 60 * 1000),
            path: "/",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            path: "/",
        });

        return {
            id: userId,
            name,
            role,
        };
    }

    async signOut(userId: string, res: Response) {
        await this.userService.updateHashedRefreshToken(userId, null);
        res.clearCookie("accessToken", { path: "/" });
        res.clearCookie("refreshToken", { path: "/" });
        return { message: "Ви успішно вийшли з акаунту" };
    }

    async validateLocalUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UnauthorizedException("Такого користувача не існує");
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new UnauthorizedException("Невірно введено пароль або логін");

        return { id: user.id, name: user.name, role: user.role };
    }

    async getCurrentUser(userId: string) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException("Користувача не знайдено або сесія завершена");
        }

        return {
            id: user.id,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            name: user.name,
            favorites: user.favorites,
            cart: user.cart,
            shippingAddress: user.shippingAddress,
        };
    }

    async generateTokens(userId: string) {
        const payload: AuthJwtPayload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async validateJwtUser(userId: string) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException("Користувача не знайдено або сесія завершена");
        }
        return { id: user.id, role: user.role };
    }

    async validateRefreshToken(userId: string, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException("Користувача не знайдено або сесія завершена");
        }

        if (!user.hashedRefreshToken) {
            throw new UnauthorizedException("Токен оновлення відсутній");
        }

        const refreshTokenMatched = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
        if (!refreshTokenMatched) {
            throw new UnauthorizedException("Недійсний токен оновлення");
        }

        return { id: user.id };
    }

    async refreshToken(userId: string, name: string, res: Response) {
        const { accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRT = await bcrypt.hash(refreshToken, 10);
        await this.userService.updateHashedRefreshToken(userId, hashedRT);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(Date.now() + 30 * 60 * 1000),
            path: "/",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            path: "/",
        });

        return {
            id: userId,
            name,
        };
    }
}
