import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { Response } from "express";
import { EmailService } from "src/email/email.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ShopUserService } from "src/shop/user/shop-user.service";
import { CreateUserDto } from "../shop/user/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly shopUserService: ShopUserService,
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService,
        private readonly configService: ConfigService,
        @Inject("JWT_ACCESS_SERVICE") private readonly jwtAccessService: JwtService,
        @Inject("JWT_REFRESH_SERVICE") private readonly jwtRefreshService: JwtService
    ) {}

    async registerUser(createUserDto: CreateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUser)
            throw new ConflictException("Користувач з такою електронною адресою вже існує");

        try {
            return await this.prisma.$transaction(async (tx) => {
                const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
                const newUser = await tx.user.create({
                    data: { ...createUserDto, password: hashedPassword, isVerified: false },
                });

                const { token, expiry } = this.generateVerificationToken();
                await tx.user.update({
                    where: { id: newUser.id },
                    data: { verificationToken: token, verificationTokenExpires: expiry },
                });

                await this.emailService.sendVerificationEmail(newUser.email, token);

                return {
                    message: "Користувача зареєстровано. Будь ласка, підтвердіть вашу пошту.",
                };
            });
        } catch (error) {
            console.error(error);
            throw new UnauthorizedException("Не вдалося відправити листа, користувача не створено");
        }
    }

    async verifyEmail(token: string) {
        const user = await this.shopUserService.findByVerificationToken(token);
        if (!user)
            throw new BadRequestException(
                "Недійсний / застарілий токен або користувача не знайдено"
            );

        await this.shopUserService.update(user.id, { isVerified: true, verificationToken: null });
        return { message: "Пошта успішно підтверджена!" };
    }

    async resendVerificationEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException("Користувача не знайдено");
        if (user.isVerified) return { message: "Акаунт вже підтверджено" };

        const { token, expiry } = this.generateVerificationToken();
        await this.prisma.user.update({
            where: { id: user.id },
            data: { verificationToken: token, verificationTokenExpires: expiry },
        });

        await this.emailService.sendVerificationEmail(user.email, token);
        return { message: "Лист з підтвердженням повторно надіслано" };
    }

    private generateVerificationToken() {
        const token = crypto.randomBytes(32).toString("hex");
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 m
        return { token, expiry };
    }

    // Login / SignOut
    async login(userId: string, res: Response) {
        const user = await this.shopUserService.findOne(userId);

        if (!user.isVerified)
            throw new UnauthorizedException(
                "Будь ласка, підтвердіть вашу електронну адресу, щоб увійти."
            );

        const { accessToken, refreshToken } = await this.generateTokens(
            userId,
            user.email,
            user.role
        );
        const hashedRT = await bcrypt.hash(refreshToken, 10);
        await this.shopUserService.updateHashedRefreshToken(userId, hashedRT);

        this.setTokensCookies(res, accessToken, refreshToken);

        return { message: "Вхід виконано успішно" };
    }

    async signOut(userId: string, res: Response) {
        await this.shopUserService.updateHashedRefreshToken(userId, null);
        res.clearCookie("accessToken", { path: "/" });
        res.clearCookie("refreshToken", { path: "/" });
        return { message: "Ви успішно вийшли з акаунту" };
    }

    private setTokensCookies(res: Response, accessToken: string, refreshToken: string) {
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: this.configService.get<string>("NODE_ENV") === "production",
            maxAge: parseInt(this.configService.get("ACCESS_TOKEN_EXPIRES_MS") || "900000"), // 15m
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: this.configService.get<string>("NODE_ENV") === "production",
            maxAge: parseInt(this.configService.get("REFRESH_TOKEN_EXPIRES_MS") || "604800000"), // 7d
        });
    }

    // Tokens
    async generateTokens(userId: string, email: string, role: string) {
        const payload = { sub: userId, email, role };
        const accessToken = await this.jwtAccessService.signAsync(payload);
        const refreshToken = await this.jwtRefreshService.signAsync(payload);
        return { accessToken, refreshToken };
    }

    async refreshToken(userId: string, res: Response) {
        const user = await this.shopUserService.findOne(userId);
        if (!user || !user.hashedRefreshToken)
            throw new UnauthorizedException("Токен оновлення недійсний");

        const { accessToken, refreshToken } = await this.generateTokens(
            userId,
            user.email,
            user.role
        );
        const hashedRT = await bcrypt.hash(refreshToken, 10);
        await this.shopUserService.updateHashedRefreshToken(userId, hashedRT);

        this.setTokensCookies(res, accessToken, refreshToken);

        return { message: "Токени успішно оновлено" };
    }

    async validateRefreshToken(userId: string, refreshToken: string) {
        const user = await this.shopUserService.findOne(userId);
        if (!user || !user.hashedRefreshToken)
            throw new UnauthorizedException("Токен оновлення недійсний");

        const isValid = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
        if (!isValid) throw new UnauthorizedException("Недійсний токен оновлення");

        return { id: user.id };
    }

    // =======================
    // Local / Jwt validation
    // =======================
    async validateLocalUser(email: string, password: string) {
        const user = await this.shopUserService.findByEmail(email);
        if (!user) throw new UnauthorizedException("Такого користувача не існує");
        if (!user.isVerified)
            throw new UnauthorizedException(
                "Будь ласка, підтвердіть вашу електронну адресу, щоб увійти."
            );

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new UnauthorizedException("Невірно введено пароль або логін");

        return { id: user.id, email: user.email, role: user.role };
    }

    async validateJwtUser(userId: string) {
        const user = await this.shopUserService.findOne(userId);
        if (!user) throw new UnauthorizedException("Користувача не знайдено або сесія завершена");
        return { id: user.id, role: user.role };
    }

    async getCurrentUser(userId: string) {
        const user = await this.shopUserService.findOne(userId);
        if (!user) throw new UnauthorizedException("Користувача не знайдено або сесія завершена");

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
}
