import {
    BadRequestException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class ShopUserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const { password, ...user } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.prisma.user.create({
            data: {
                password: hashedPassword,
                ...user,
            },
        });
    }

    async getAllUsers() {
        return await this.prisma.user.findMany();
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findOne(userId: string) {
        return await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                favorites: {
                    include: {
                        product: {
                            include: {
                                category: {
                                    include: {
                                        collection: true,
                                    },
                                },
                            },
                        },
                    },
                },
                cart: {
                    include: {
                        product: {
                            include: {
                                category: {
                                    include: {
                                        collection: true,
                                    },
                                },
                            },
                        },
                    },
                },
                shippingAddress: true,
            },
        });
    }

    async editUserInfo(userId: string, updateUserDto: UpdateUserDto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`Користувач з id ${userId} не знайдений`);
        }
        return await this.prisma.user.update({
            where: { id: userId },
            data: updateUserDto,
        });
    }

    async updateHashedRefreshToken(userId: string, hashedRT: string | null) {
        return await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRefreshToken: hashedRT,
            },
        });
    }

    async changePassword(userId: string, data: { oldPassword: string; newPassword: string }) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            if (!existingUser) {
                throw new NotFoundException(`Користувач з id ${userId} не знайдений`);
            }

            const isComparedPassword = await bcrypt.compare(
                data.oldPassword,
                existingUser.password
            );

            if (!isComparedPassword) {
                throw new BadRequestException("Неправильний старий пароль");
            }

            const hashedPassword = await bcrypt.hash(data.newPassword, 10);

            await this.prisma.user.update({
                where: { id: userId },
                data: { password: hashedPassword },
            });

            return { message: "Пароль успішно змінено" };
        } catch (error) {
            console.error("Помилка зміни пароля:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося змінити пароль.");
        }
    }

    async deleteAccount(userId: string, password: string) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            if (!existingUser) {
                throw new NotFoundException(`Користувач з id ${userId} не знайдений`);
            }

            const isComparedPassword = await bcrypt.compare(password, existingUser.password);

            if (!isComparedPassword) {
                throw new BadRequestException("Неправильний пароль");
            }

            await this.prisma.user.delete({
                where: {
                    id: userId,
                },
            });

            return { message: "Акаунт успішно видалено" };
        } catch (error) {
            console.error("Помилка видалення акаунту:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося вмидалити акаунт.");
        }
    }
}
