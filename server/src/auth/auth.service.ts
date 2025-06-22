// src/auth/auth.service.ts
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "./dto/register-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterUserDto) {
        const { username, email, password, phone } = registerDto;

        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new BadRequestException("User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                username,
                email,
                phone,
                password: hashedPassword,
            },
            select: {
                id: true,
                username: true,
                email: true,
                phone: true,
                createdAt: true,
            },
        });

        return user;
    }

    async login(loginDto: LoginUserDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUserById(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                phone: true,
            },
        });
    }
}
