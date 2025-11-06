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
                message: "Користувача успішно створено",
                data: user,
            };
        } catch (error) {
            console.error("Помилка створення користувача:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося створити користувача.");
        }
    }

    async getAllUsers() {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            console.error("Помилка отримання користувачів:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати користувачів.");
        }
    }

    async findByEmail(email: string) {
        try {
            return await this.prisma.user.findUnique({
                where: { email },
            });
        } catch (error) {
            console.error("Помилка пошуку користувача за email:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося знайти користувача.");
        }
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
                                    category: {
                                        include: { collection: true },
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
                                        include: { collection: true },
                                    },
                                },
                            },
                        },
                    },
                    shippingAddress: true,
                },
            });

            if (!user) {
                throw new NotFoundException(`Користувач з id ${userId} не знайдений`);
            }

            return user;
        } catch (error) {
            console.error("Помилка отримання користувача:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати користувача.");
        }
    }

    async editUserInfo(userId: string, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                throw new NotFoundException(`Користувач з id ${userId} не знайдений`);
            }
            const updatedUser = await this.prisma.user.update({
                where: { id: userId },
                data: updateUserDto,
            });

            return {
                message: "Дані користувача успішно змінено",
                data: updatedUser,
            };
        } catch (error) {
            console.error("Помилка оновлення інформації користувача:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося оновити інформацію користувача.");
        }
    }

    async updateHashedRefreshToken(userId: string, hashedRT: string | null) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: { hashedRefreshToken: hashedRT },
        });
    }

    async changePassword(userId: string, data: { oldPassword: string; newPassword: string }) {
        try {
            const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });

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

            return {
                message: "Пароль успішно змінено",
            };
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
            const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });

            if (!existingUser) {
                throw new NotFoundException(`Користувач з id ${userId} не знайдений`);
            }

            const isComparedPassword = await bcrypt.compare(password, existingUser.password);

            if (!isComparedPassword) {
                throw new BadRequestException("Неправильний пароль");
            }

            await this.prisma.user.delete({
                where: { id: userId },
            });
            return {
                message: "Акаунт успішно видалено",
            };
        } catch (error) {
            console.error("Помилка видалення акаунту:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося видалити акаунт.");
        }
    }

    async findByVerificationToken(token: string) {
        const user = await this.prisma.user.findFirst({
            where: { verificationToken: token },
        });

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
