import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async findUserJohn(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                shippingAddress: true,
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
            },
        });
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        return await this.prisma.user.update({
            where: {
                id,
            },
            data: updateUserDto,
        });
    }
}
