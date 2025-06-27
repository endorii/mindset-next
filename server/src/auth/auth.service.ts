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
        if (user) throw new ConflictException("User already exists!");
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
        return { message: "Signed out successfully" };
    }

    async validateLocalUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UnauthorizedException("User not found!");
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new UnauthorizedException("Invalid Credentials!");

        return { id: user.id, name: user.name, role: user.role };
    }

    async getCurrentUser(userId: string) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException("User not found!");
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
        if (!user) throw new UnauthorizedException("User not found!");
        const currentUser = { id: user.id, role: user.role };
        return currentUser;
    }

    async validateRefreshToken(userId: string, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        if (!user) throw new UnauthorizedException("User not found!");

        if (!user.hashedRefreshToken) {
            throw new UnauthorizedException("No refresh token stored");
        }

        const refreshTokenMatched = await bcrypt.compare(refreshToken, user.hashedRefreshToken);

        if (!refreshTokenMatched) throw new UnauthorizedException("Invalid Refresh Token!");
        const currentUser = { id: user.id };
        return currentUser;
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
