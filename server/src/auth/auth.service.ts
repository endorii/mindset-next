import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../shop/user/dto/create-user.dto";
import { ShopUserService } from "src/shop/user/shop-user.service";
import type { AuthJwtPayload } from "./types/auth-jwtPayload";
import { JwtService } from "@nestjs/jwt";
import refreshConfig from "./config/refresh.config";
import { ConfigType } from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import { Response } from "express";
import * as crypto from "crypto";
import { EmailService } from "src/email/email.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly shopUserService: ShopUserService,
        private readonly jwtService: JwtService,
        @Inject(refreshConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshConfig>,
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService
    ) {}

    async registerUser(createUserDto: CreateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new ConflictException("Користувач з такою електронною адресою вже існує");
        }

        try {
            return await this.prisma.$transaction(async (tx) => {
                const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

                const newUser = await tx.user.create({
                    data: {
                        ...createUserDto,
                        password: hashedPassword,
                        isVerified: false,
                    },
                });

                const verificationToken = crypto.randomBytes(32).toString("hex");
                const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

                const updatedUser = await tx.user.update({
                    where: { id: newUser.id },
                    data: {
                        verificationToken,
                        verificationTokenExpires: tokenExpiry,
                    },
                });

                await this.emailService.sendVerificationEmail(updatedUser.email, verificationToken);

                return {
                    message: "Користувача зареєстровано. Будь ласка, підтвердіть вашу пошту.",
                };
            });
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException("Не вдалося відправити листа, користувача не створено");
        }
    }

    async verifyEmail(token: string) {
        const user = await this.shopUserService.findByVerificationToken(token);

        if (!user) {
            throw new BadRequestException(
                "Недійсний / застарілий токен або користувача не знайдено"
            );
        }

        await this.shopUserService.update(user.id, {
            isVerified: true,
            verificationToken: null,
        });

        return { message: "Пошта успішно підтверджена!" };
    }

    async resendVerificationEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException("Користувача не знайдено");
        }

        if (user.isVerified) {
            return { message: "Акаунт вже підтверджено" };
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { verificationToken, verificationTokenExpires },
        });

        await this.emailService.sendVerificationEmail(user.email, verificationToken);

        return { message: "Лист з підтвердженням повторно надіслано" };
    }

    async login(userId: string, res: Response) {
        const user = await this.shopUserService.findOne(userId);
        if (!user.isVerified) {
            throw new UnauthorizedException(
                "Будь ласка, підтвердіть вашу електронну адресу, щоб увійти."
            );
        }

        const { accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRT = await bcrypt.hash(refreshToken, 10);
        await this.shopUserService.updateHashedRefreshToken(userId, hashedRT);

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
            message: "Вхід виконано успішно",
        };
    }

    async signOut(userId: string, res: Response) {
        await this.shopUserService.updateHashedRefreshToken(userId, null);
        res.clearCookie("accessToken", { path: "/" });
        res.clearCookie("refreshToken", { path: "/" });
        return { message: "Ви успішно вийшли з акаунту" };
    }

    async getCurrentUser(userId: string) {
        const user = await this.shopUserService.findOne(userId);
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
        const user = await this.shopUserService.findOne(userId);
        if (!user) {
            throw new UnauthorizedException("Користувача не знайдено або сесія завершена");
        }
        return { id: user.id, role: user.role };
    }

    async validateLocalUser(email: string, password: string) {
        const user = await this.shopUserService.findByEmail(email);
        if (!user) throw new UnauthorizedException("Такого користувача не існує");

        if (!user.isVerified) {
            throw new UnauthorizedException(
                "Будь ласка, підтвердіть вашу електронну адресу, щоб увійти."
            );
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new UnauthorizedException("Невірно введено пароль або логін");

        return { id: user.id, name: user.name, role: user.role };
    }

    async validateRefreshToken(userId: string, refreshToken: string) {
        const user = await this.shopUserService.findOne(userId);
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
        await this.shopUserService.updateHashedRefreshToken(userId, hashedRT);

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
