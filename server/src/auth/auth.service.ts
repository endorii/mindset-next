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
import { GoogleAuthRequest } from "./interfaces/google-auth-request.interface";
import { GoogleUser } from "./interfaces/google-user.interface";

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

        if (existingUser) throw new ConflictException("User with this email already exists");

        try {
            return await this.prisma.$transaction(async (tx) => {
                const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
                const newUser = await tx.user.create({
                    data: {
                        ...createUserDto,
                        password: hashedPassword,
                        isVerified: false,
                        phone: createUserDto.phone,
                    },
                });

                const { token, hashedToken, expiry } = this.generateToken();
                await tx.user.update({
                    where: { id: newUser.id },
                    data: { verificationToken: hashedToken, verificationTokenExpires: expiry },
                });

                await this.emailService.sendVerificationEmail(newUser.email, token);

                return {
                    message: "User registered successfully. Please verify your email.",
                };
            });
        } catch (error) {
            console.error(error);
            throw new UnauthorizedException("Failed to send email, user was not created");
        }
    }

    async verifyEmail(token: string) {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await this.prisma.user.findFirst({
            where: {
                verificationToken: hashedToken,
                verificationTokenExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) throw new BadRequestException("Invalid or expired token");

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpires: null,
            },
        });

        await this.emailService.sendRegistrationEmail(user.email);

        return { message: "Email verified successfully!" };
    }

    async resetPassword(token: string, newPassword: string) {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: hashedToken,
                resetPasswordTokenExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            throw new BadRequestException("Invalid or expired token");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordTokenExpires: null,
            },
        });

        return { message: "Password reset successfully" };
    }

    async resendVerificationEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException("User not found");
        if (user.isVerified) return { message: "Account already verified" };

        const { token, hashedToken, expiry } = this.generateToken();
        await this.prisma.user.update({
            where: { id: user.id },
            data: { verificationToken: hashedToken, verificationTokenExpires: expiry },
        });

        await this.emailService.sendVerificationEmail(user.email, token);
        return { message: "Verification email resent" };
    }

    async requestPasswordReset(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            return { message: "If the email exists, password reset link has been sent" };
        }

        if (!user?.password)
            throw new BadRequestException(
                "This account does not have a password. You signed up using Google."
            );

        const { token, hashedToken, expiry } = this.generateToken();

        await this.prisma.user.update({
            where: { id: user.id },
            data: { resetPasswordToken: hashedToken, resetPasswordTokenExpires: expiry },
        });

        await this.emailService.sendPasswordResetEmail(user.email, token);
        return { message: "If the email exists, password reset link has been sent" };
    }

    private generateToken() {
        const token = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        return { token, hashedToken, expiry };
    }

    // Login / SignOut
    async login(userId: string, res: Response) {
        const user = await this.shopUserService.findOne(userId);

        if (!user.isVerified)
            throw new UnauthorizedException("Please verify your email to log in.");

        const { accessToken, refreshToken } = await this.generateTokens(
            userId,
            user.email,
            user.role
        );
        const hashedRT = await bcrypt.hash(refreshToken, 10);
        await this.shopUserService.updateHashedRefreshToken(userId, hashedRT);

        this.setTokenInCookies(res, refreshToken);

        return { data: { accessToken, user }, message: "Login successful" };
    }

    async googleLogin(googleUser: GoogleUser) {
        return await this.prisma.$transaction(async (tx) => {
            let user = await tx.user.findUnique({
                where: { email: googleUser.email },
            });

            if (!user) {
                user = await tx.user.create({
                    data: {
                        email: googleUser.email,
                        userName: `${googleUser.firstName} ${googleUser.lastName}`,
                        password: "",
                        phone: "",
                        googleId: googleUser.googleId,
                        isVerified: true,
                    },
                });

                await this.emailService.sendRegistrationEmail(googleUser.email);
            } else if (!user.googleId) {
                user = await tx.user.update({
                    where: { id: user.id },
                    data: {
                        googleId: googleUser.googleId,
                        isVerified: true,
                    },
                });
            }

            const accessToken = this.jwtAccessService.sign({
                sub: user.id,
                userName: user.userName,
                email: user.email,
            });

            const refreshToken = this.jwtRefreshService.sign({
                sub: user.id,
                userName: user.userName,
                email: user.email,
            });

            const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

            await tx.user.update({
                where: { id: user.id },
                data: {
                    hashedRefreshToken,
                },
            });

            return {
                accessToken,
                refreshToken,
            };
        });
    }

    async googleAuthRedirect(req: GoogleAuthRequest, res: Response) {
        try {
            const { accessToken, refreshToken } = await this.googleLogin(req.user);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
                secure: this.configService.get("NODE_ENV") === "production",
                maxAge: parseInt(this.configService.get("REFRESH_TOKEN_EXPIRES_MS") || "604800000"), // 7d
                path: "/",
            });

            // Редірект на фронтенд з токеном
            const frontendUrl: string =
                this.configService.get("FRONTEND_URL") || "http://localhost:3000";
            return res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
        } catch (error) {
            console.log(error);

            const frontendUrl: string =
                this.configService.get("FRONTEND_URL") || "http://localhost:3000";
            return res.redirect(`${frontendUrl}/signin?error=google_auth_failed`);
        }
    }

    async signOut(userId: string, res: Response) {
        await this.shopUserService.updateHashedRefreshToken(userId, null);
        res.clearCookie("refreshToken", { path: "/" });
        return { message: "Successfully signed out" };
    }

    private setTokenInCookies(res: Response, refreshToken: string) {
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: this.configService.get<string>("NODE_ENV") === "production",
            maxAge: parseInt(this.configService.get("REFRESH_TOKEN_EXPIRES_MS") || "604800000"), // 7 days
            path: "/",
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
            throw new UnauthorizedException("Invalid refresh token");

        const { accessToken, refreshToken } = await this.generateTokens(
            userId,
            user.email,
            user.role
        );
        const hashedRT = await bcrypt.hash(refreshToken, 10);
        await this.shopUserService.updateHashedRefreshToken(userId, hashedRT);

        this.setTokenInCookies(res, refreshToken);

        return { data: accessToken, message: "Tokens successfully refreshed" };
    }

    async validateRefreshToken(userId: string, refreshToken: string) {
        const user = await this.shopUserService.findOne(userId);
        if (!user || !user.hashedRefreshToken)
            throw new UnauthorizedException("Invalid refresh token");

        const isValid = await bcrypt.compare(refreshToken, user.hashedRefreshToken);
        if (!isValid) throw new UnauthorizedException("Invalid refresh token");

        return { id: user.id };
    }

    // Local / Jwt validation
    async validateLocalUser(email: string, password: string) {
        const user = await this.shopUserService.findByEmail(email);
        if (!user.isVerified)
            throw new UnauthorizedException("Please verify your email to log in.");

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) throw new BadRequestException("Incorrect email or password");

        return { id: user.id, email: user.email, role: user.role };
    }

    async validateJwtUser(userId: string) {
        const user = await this.shopUserService.findOne(userId);
        if (!user) throw new UnauthorizedException("User not found or session expired");
        return { id: user.id, role: user.role };
    }

    async getCurrentUser(userId: string) {
        const user = await this.shopUserService.findOne(userId);
        if (!user) throw new UnauthorizedException("User not found or session expired");

        return {
            id: user.id,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            userName: user.userName,
            favorites: user.favorites,
            cart: user.cart,
            shippingAddress: user.shippingAddress,
            withPassword: !!user.password,
        };
    }
}
