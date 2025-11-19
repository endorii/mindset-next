import {
    BadRequestException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class ShopUserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        try {
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
        } catch (error) {
            console.error("Error creating user:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to create user.");
        }
    }

    async getAllUsers() {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            console.error("Error fetching users:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to fetch users.");
        }
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return user;
    }

    async findOne(userId: string) {
        try {
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
        } catch (error) {
            console.error("Error fetching user:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to fetch user.");
        }
    }

    async editUserInfo(userId: string, updateUserDto: UpdateUserDto) {
        try {
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
        } catch (error) {
            console.error("Error updating user info:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to update user information.");
        }
    }

    async updateHashedRefreshToken(userId: string, hashedRT: string | null) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { hashedRefreshToken: hashedRT },
        });
    }

    async changePassword(userId: string, data: { oldPassword: string; newPassword: string }) {
        try {
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
        } catch (error) {
            console.error("Error changing password:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to change password.");
        }
    }

    async deleteAccount(userId: string, password: string) {
        try {
            const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });
            if (!existingUser) throw new NotFoundException(`User with id ${userId} not found`);

            const isMatched = await bcrypt.compare(password, existingUser.password);
            if (!isMatched) throw new BadRequestException("Incorrect password");

            await this.prisma.user.delete({ where: { id: userId } });

            return { message: "Account successfully deleted" };
        } catch (error) {
            console.error("Error deleting account:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Failed to delete account.");
        }
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
