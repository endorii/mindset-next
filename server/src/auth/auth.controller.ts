import { Body, Controller, Post, Req, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LocalAuthGuard } from "./guards/local-auth/local-auth.guard";
import { RefreshAuthGuard } from "./guards/refresh-auth/refresh-auth.guard";
// import { GoogleAuthGuard } from "./guards/google-auth/google-auth.guard";
// import { Response } from "express";
import { Public } from "./decorators/public.decorator";
// import { Roles } from "./decorators/roles.decorator";
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

    // @Roles("ADMIN", "EDITOR")
    // @Get("protected")
    // getAll(@Request() req: ExpressRequest & { user: AuthenticatedRequestUser }) {
    //     return {
    //         messege: `Now you can access this protected API. this is your user ID: ${req.user.id}`,
    //     };
    // }

    // @Public()
    // @UseGuards(GoogleAuthGuard)
    // @Get("google/login")
    // googleLogin() {}

    // @Public()
    // @UseGuards(GoogleAuthGuard)
    // @Get("google/callback")
    // async googleCallback(@Request() req, @Res() res: Response) {
    //     // console.log('Google User', req.user);
    //     const resopnse = await this.authService.login(req.user.id, req.user.name, req.user.role);
    //     res.redirect(
    //         `http://localhost:3000/api/auth/google/callback?userId=${resopnse.id}&name=${resopnse.name}&accessToken=${resopnse.accessToken}&refreshToken=${resopnse.refreshToken}&role=${resopnse.role}`
    //     );
    // }
}
