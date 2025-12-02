import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserDto } from "../shop/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { GoogleAuthGuard } from "./guards/google/google-auth.guard";
import { JwtAccessGuard } from "./guards/jwt/jwt-access.guard";
import { JwtRefreshGuard } from "./guards/jwt/jwt-refresh.guard";
import { LocalAuthGuard } from "./guards/local-auth/local-auth.guard";
import { AuthenticatedRequestUser } from "./interfaces/auth-request-user";
import { GoogleAuthRequest } from "./interfaces/google-auth-request.interface";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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
    @Post("forgot-password")
    async forgotPassword(@Body() body: ForgotPasswordDto) {
        return this.authService.requestPasswordReset(body.email);
    }

    @Public()
    @Post("reset-password")
    async resetPassword(@Body() body: ResetPasswordDto) {
        return this.authService.resetPassword(body.token, body.newPassword);
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
        return this.authService.googleAuthRedirect(req, res);
    }
}
