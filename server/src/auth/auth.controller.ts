import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { UserResponseDto } from "src/user/dto/user-response.dto.";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
// import { ForgotPasswordDto } from './dto/forgot-password.dto';
// import { ResetPasswordDto } from "./dto/reset-password.dto";
// import { Roles } from "./roles.decorator";
// import { JwtAuthRoleGuard } from "./jwt-auth-role.guard";
// import { Role } from "src/user/enum/role.enum";
import { AuthResponseDto } from "./dto/auth-response.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post("login")
    @ApiOkResponse({ type: AuthResponseDto })
    async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        return this.authService.login(loginDto);
    }

    @Post("register")
    @ApiOkResponse({ type: UserResponseDto })
    async register(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.userService.create(createUserDto);
    }

    // @Post('forgot-password')
    // @ApiOkResponse({ type: AuthResponseDto })
    // forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): AuthResponseDto {
    //   return this.authService.forgotPassword(forgotPasswordDto);
    // }

    // @Post("reset-password")
    // @ApiOkResponse({ type: UserResponseDto })
    // @UseGuards(JwtAuthRoleGuard())
    // @Roles(Role.Admin)
    // async resetPassword(
    //     @Body() resetPasswordDto: ResetPasswordDto,
    //     @Request() req
    // ): Promise<UserResponseDto> {
    //     return this.authService.resetPassword(resetPasswordDto, req.user);
    // }
}
