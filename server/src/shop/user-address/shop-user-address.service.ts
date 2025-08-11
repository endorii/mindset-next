import {
    ConflictException,
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

            return await this.prisma.shippingAddress.create({
                data: {
                    user: {
                        connect: { id: userId },
                    },
                    ...addressData,
                },
            });
        } catch (error) {
            if (error instanceof ConflictException) throw error;

            console.error("Помилка додавання адреси користувача:", error);
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

            return await this.prisma.shippingAddress.update({
                where: { userId },
                data: updateUserAddressDto,
            });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            console.error("Помилка оновлення адреси користувача:", error);
            throw new InternalServerErrorException("Не вдалося оновити адресу користувача.");
        }
    }
}
