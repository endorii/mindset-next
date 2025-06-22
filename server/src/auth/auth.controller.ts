import { Body, Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "./interfaces/request-with-user.interface";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    async register(@Body() registerDto: RegisterUserDto) {
        return this.authService.register(registerDto);
    }

    @Post("login")
    async login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("profile")
    getProfile(@Request() req: RequestWithUser) {
        return req.user;
    }
}
