import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { CreateUserDto } from "../shop/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { GoogleAuthGuard } from "./guards/google/google-auth.guard";
import { JwtAccessGuard } from "./guards/jwt/jwt-access.guard";
import { JwtRefreshGuard } from "./guards/jwt/jwt-refresh.guard";
import { LocalAuthGuard } from "./guards/local-auth/local-auth.guard";
import { AuthenticatedRequestUser } from "./interfaces/auth-request-user";
import { GoogleAuthRequest } from "./interfaces/google-auth-request.interface";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {}

    @Public()
    @Post("signup")
    registerUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.registerUser(createUserDto);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("signin")
    login(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Res({ passthrough: true }) res: Response
    ) {
        return this.authService.login(req.user.id, res);
    }

    @UseGuards(JwtAccessGuard)
    @Get("me")
    getCurrentUser(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        return this.authService.getCurrentUser(req.user.id);
    }

    @Post("signout")
    signOut(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Res({ passthrough: true }) res: Response
    ) {
        return this.authService.signOut(req.user.id, res);
    }

    @Public()
    @UseGuards(JwtRefreshGuard)
    @Post("refresh")
    refreshToken(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Res({ passthrough: true }) res: Response
    ) {
        return this.authService.refreshToken(req.user.id, res);
    }

    @Public()
    @Get("verify")
    verifyEmail(@Query("token") token: string) {
        return this.authService.verifyEmail(token);
    }

    @Public()
    @Post("resend-verification")
    async resendVerification(@Body("email") email: string) {
        return this.authService.resendVerificationEmail(email);
    }

    @Public()
    @Get("google")
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
        // Ініціює Google OAuth flow
    }

    @Public()
    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(
        @Req() req: GoogleAuthRequest,
        @Res({ passthrough: true }) res: Response
    ) {
        try {
            const { accessToken, refreshToken } = await this.authService.googleLogin(req.user);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "lax",
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
}
