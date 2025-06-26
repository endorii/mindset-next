import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LocalAuthGuard } from "./guards/local-auth/local-auth.guard";
import { RefreshAuthGuard } from "./guards/refresh-auth/refresh-auth.guard";
import { Public } from "./decorators/public.decorator";
import { Request as ExpressRequest } from "express";
import { AuthenticatedRequestUser } from "./types/auth-request-user.type";

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
    login(@Request() req: ExpressRequest & { user: AuthenticatedRequestUser }) {
        return this.authService.login(req.user.id, req.user.name, req.user.role);
    }

    @Get("me")
    getCurrentUser(@Req() req: ExpressRequest & { user: AuthenticatedRequestUser }) {
        return this.authService.getCurrentUser(req.user.id);
    }

    @Public()
    @UseGuards(RefreshAuthGuard)
    @Post("refresh")
    refreshToken(@Request() req: ExpressRequest & { user: AuthenticatedRequestUser }) {
        return this.authService.refreshToken(req.user.id, req.user.name);
    }

    @Post("signout")
    signOut(@Req() req: ExpressRequest & { user: AuthenticatedRequestUser }) {
        return this.authService.signOut(req.user.id);
    }
}
