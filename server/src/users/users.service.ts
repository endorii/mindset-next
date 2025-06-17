import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
    // create(createUserDto: CreateUserDto) {
    //   return 'This action adds a new user';
    // }

    // findAll() {
    //   return `This action returns all user`;
    // }

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

    // update(id: number, updateUserDto: UpdateUserDto) {
    //   return `This action updates a #${id} user`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} user`;
    // }
}
