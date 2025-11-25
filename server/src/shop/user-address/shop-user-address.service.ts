import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";

@Injectable()
export class ShopUserAddressService {
    constructor(private readonly prisma: PrismaService) {}

    async addUserAddress(createUserAddressDto: CreateUserAddressDto) {
        const { userId, ...addressData } = createUserAddressDto;

        const existingAddress = await this.prisma.shippingAddress.findUnique({
            where: { userId },
        });

        if (existingAddress) {
            throw new ConflictException("Shipping address already exists");
        }

        const address = await this.prisma.shippingAddress.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                ...addressData,
            },
        });

        return {
            message: "Shipping address added successfully",
            data: address,
        };
    }

    async updateUserAddress(userId: string, updateUserAddressDto: UpdateUserAddressDto) {
        const existingAddress = await this.prisma.shippingAddress.findUnique({
            where: { userId },
        });

        if (!existingAddress) {
            throw new NotFoundException(`Shipping address for user ID ${userId} not found`);
        }

        const updatedAddress = await this.prisma.shippingAddress.update({
            where: { userId },
            data: updateUserAddressDto,
        });

        return {
            message: "Shipping address updated successfully",
            data: updatedAddress,
        };
    }
}
