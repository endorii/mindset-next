import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { User } from "generated/prisma";
// import { UserResponseDto } from "src/user/dto/user-response.dto.";
// import { plainToClass } from "class-transformer";
// import { ForgotPasswordDto } from './dto/forgot-password.dto';
// import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ConfigService } from "@nestjs/config";
import { AuthResponseDto } from "./dto/auth-response.dto";

export const roundsOfHashing = 10;

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService
        // private readonly emailService: EmailService,
    ) {}

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new UnauthorizedException("User not found!");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Wrong password!");
        }

        return {
            accessToken: this.generateAccessToken(user),
        };
    }

    generateAccessToken(user: User, options?: JwtSignOptions): string {
        return this.jwtService.sign(
            {
                userId: user.id,
                role: user.role,
                username: user.username,
                email: user.email,
            },
            options
        );
    }

    // async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<AuthResponseDto> {
    //   const { email } = forgotPasswordDto;
    //   const user = await this.prisma.user.findUnique({ where: { email } });

    //   if (!user) {
    //     throw new UnauthorizedException('User not found!');
    //   }

    //   const accessToken = this.generateAccessToken(user, { expiresIn: '1h' });

    //   await this.emailService.sendEmail(email, 'Reset Your Password', 'reset-password.html', {
    //     name: `${user.firstName} ${user.lastName}`,
    //     resetUrl: `${this.config.get('frontendUrl')}/reset-password?token=${accessToken}`,
    //   });

    //   return {
    //     accessToken,
    //   };
    // }

    // async resetPassword(resetPasswordDto: ResetPasswordDto, user: User): Promise<UserResponseDto> {
    //     const { password } = resetPasswordDto;
    //     const getUser = await this.prisma.user.findUniqueOrThrow({ where: { email: user.email } });

    //     const hashedPassword = await bcrypt.hash(password, roundsOfHashing);
    //     return plainToClass(
    //         UserResponseDto,
    //         this.prisma.user.update({
    //             where: { id: getUser.id },
    //             data: {
    //                 password: hashedPassword,
    //             },
    //         })
    //     );
    // }
}
