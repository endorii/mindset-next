import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserAddressService {
    constructor(private readonly prisma: PrismaService) {}
    async addUserAddress(createUserAddressDto: CreateUserAddressDto) {
        const { userId, ...addressData } = createUserAddressDto;

        // 1. Перевірка наявності адреси для користувача
        const existingAddress = await this.prisma.shippingAddress.findUnique({
            where: { userId },
        });

        if (existingAddress) {
            throw new ConflictException(
                `Shipping address already exists for user with ID ${userId}. Use PATCH to update.`
            );
        }

        try {
            return await this.prisma.shippingAddress.create({
                data: {
                    user: {
                        connect: { id: userId },
                    },
                    ...addressData,
                },
            });
        } catch (error) {
            throw new NotFoundException(`User with ID ${userId} not found.`, error);
        }
    }

    async updateUserAddress(userId: string, updateUserAddressDto: UpdateUserAddressDto) {
        return await this.prisma.shippingAddress.update({
            where: {
                userId,
            },
            data: updateUserAddressDto,
        });
    }

    remove(id: number) {
        return `This action removes a #${id} userAddress`;
    }
}
