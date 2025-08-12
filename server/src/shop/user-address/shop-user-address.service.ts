import {
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
import { PrismaService } from "src/prisma/prisma.service";

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
                throw new ConflictException(`Адреса доставки вже існує`);
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
                message: "Адресу доставки додано",
                data: address,
            };
        } catch (error) {
            console.error("Помилка додавання адреси користувача:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося додати адресу користувача.");
        }
    }

    async updateUserAddress(userId: string, updateUserAddressDto: UpdateUserAddressDto) {
        try {
            const existingAddress = await this.prisma.shippingAddress.findUnique({
                where: { userId },
            });

            if (!existingAddress) {
                throw new NotFoundException(`Адреса для користувача з ID ${userId} не знайдена.`);
            }

            const updatedAddress = await this.prisma.shippingAddress.update({
                where: { userId },
                data: updateUserAddressDto,
            });

            return {
                message: "Адресу доставки успішно редаговано",
                data: updatedAddress,
            };
        } catch (error) {
            console.error("Помилка оновлення адреси користувача:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося оновити адресу користувача.");
        }
    }
}
