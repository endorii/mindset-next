import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
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

    async editUserInfo(id: string, updateUserDto: UpdateUserDto) {
        return await this.prisma.user.update({
            where: {
                id,
            },
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
}
