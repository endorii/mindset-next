import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class ShopUserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const { password, ...rest } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                password: hashedPassword,
                ...rest,
            },
        });

        return {
            message: "User successfully created",
            data: user,
        };
    }

    async getAllUsers() {
        return await this.prisma.user.findMany();
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return user;
    }

    async findOne(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                favorites: {
                    include: {
                        product: {
                            include: {
                                category: { include: { collection: true } },
                            },
                        },
                    },
                },
                cart: {
                    include: {
                        product: {
                            include: {
                                category: { include: { collection: true } },
                            },
                        },
                    },
                },
                shippingAddress: true,
            },
        });

        if (!user) throw new NotFoundException(`User with id ${userId} not found`);

        return user;
    }

    async editUserInfo(userId: string, updateUserDto: UpdateUserDto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException(`User with id ${userId} not found`);

        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: updateUserDto,
        });

        return {
            message: "User information successfully updated",
            data: updatedUser,
        };
    }

    async updateHashedRefreshToken(userId: string, hashedRT: string | null) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { hashedRefreshToken: hashedRT },
        });
    }

    async changePassword(userId: string, data: { oldPassword: string; newPassword: string }) {
        const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!existingUser) throw new NotFoundException(`User with id ${userId} not found`);

        const isMatched = await bcrypt.compare(data.oldPassword, existingUser.password);
        if (!isMatched) throw new BadRequestException("Incorrect old password");

        const hashedPassword = await bcrypt.hash(data.newPassword, 10);

        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        return { message: "Password successfully changed" };
    }

    async deleteAccount(userId: string, password: string) {
        const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!existingUser) throw new NotFoundException(`User with id ${userId} not found`);

        const isMatched = await bcrypt.compare(password, existingUser.password);
        if (!isMatched) throw new BadRequestException("Incorrect password");

        await this.prisma.user.delete({ where: { id: userId } });

        return { message: "Account successfully deleted" };
    }

    async findByVerificationToken(token: string) {
        const user = await this.prisma.user.findFirst({ where: { verificationToken: token } });

        if (
            !user ||
            !user.verificationTokenExpires ||
            user.verificationTokenExpires.getTime() < Date.now()
        ) {
            return null;
        }

        return user;
    }

    async update(userId: string, data: UpdateUserDto) {
        const updateData = { ...data };

        if (data.isVerified) {
            updateData.verificationToken = null;
            updateData.verificationTokenExpires = null;
        }

        return this.prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
    }
}
