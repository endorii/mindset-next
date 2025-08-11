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
        try {
            const { password, ...user } = createUserDto;
            const hashedPassword = await bcrypt.hash(password, 10);
            return await this.prisma.user.create({
                data: {
                    password: hashedPassword,
                    ...user,
                },
            });
        } catch (error) {
            console.error("Помилка створення користувача:", error);
            throw new InternalServerErrorException("Не вдалося створити користувача.");
        }
    }

    async getAllUsers() {
        try {
            return await this.prisma.user.findMany();
        } catch (error) {
            console.error("Помилка отримання користувачів:", error);
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
            if (error instanceof NotFoundException) throw error;
            console.error("Помилка отримання користувача:", error);
            throw new InternalServerErrorException("Не вдалося отримати користувача.");
        }
    }

    async editUserInfo(userId: string, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                throw new NotFoundException(`Користувач з id ${userId} не знайдений`);
            }
            return await this.prisma.user.update({
                where: { id: userId },
                data: updateUserDto,
            });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            console.error("Помилка оновлення інформації користувача:", error);
            throw new InternalServerErrorException("Не вдалося оновити інформацію користувача.");
        }
    }

    async updateHashedRefreshToken(userId: string, hashedRT: string | null) {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: { hashedRefreshToken: hashedRT },
            });
        } catch (error) {
            console.error("Помилка оновлення refresh token:", error);
            throw new InternalServerErrorException("Не вдалося оновити refresh token.");
        }
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
        } catch (error) {
            console.error("Помилка зміни пароля:", error);
            if (error instanceof HttpException) throw error;
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
        } catch (error) {
            console.error("Помилка видалення акаунту:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Не вдалося видалити акаунт.");
        }
    }
}
