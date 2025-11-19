import {
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";

@Injectable()
export class ShopUserAddressService {
    constructor(private readonly prisma: PrismaService) {}

    async addUserAddress(createUserAddressDto: CreateUserAddressDto) {
        const { userId, ...addressData } = createUserAddressDto;

        try {
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
        } catch (error) {
            console.error("Error adding user address:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to add user address");
        }
    }

    async updateUserAddress(userId: string, updateUserAddressDto: UpdateUserAddressDto) {
        try {
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
        } catch (error) {
            console.error("Error updating user address:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to update user address");
        }
    }
}
