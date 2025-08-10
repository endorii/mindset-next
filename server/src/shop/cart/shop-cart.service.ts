import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ShopCartService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllCartItemsFromUser(userId: string) {
        try {
            const cartItems = await this.prisma.cartItem.findMany({
                where: { userId },
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
            });

            return cartItems;
        } catch (error) {
            console.error("Помилка при отриманні кошика користувача:", error);
            throw new InternalServerErrorException("Помилка сервера при отриманні кошика");
        }
    }

    async addCartItemToUser(userId: string, createCartDto: CreateCartDto) {
        try {
            const existingCartItem = await this.prisma.cartItem.findUnique({
                where: {
                    userId_productId_size_type_color: {
                        userId,
                        productId: createCartDto.productId,
                        size: createCartDto.size,
                        type: createCartDto.type,
                        color: createCartDto.color,
                    },
                },
            });

            if (existingCartItem) {
                throw new ConflictException("Товар з такими параметрами вже доданий у кошик");
            }

            return await this.prisma.cartItem.create({
                data: {
                    userId,
                    productId: createCartDto.productId,
                    size: createCartDto.size,
                    type: createCartDto.type,
                    color: createCartDto.color,
                    quantity: createCartDto.quantity,
                },
            });
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            console.error("Помилка при додаванні товару у кошик:", error);
            throw new InternalServerErrorException("Помилка сервера при додаванні товару в кошик");
        }
    }

    async removeCartItemFromUser(userId: string, cartItemId: string) {
        try {
            const existingItem = await this.prisma.cartItem.findUnique({
                where: { userId, id: cartItemId },
            });

            if (!existingItem) {
                throw new NotFoundException("Товар у кошику не знайдений");
            }

            return await this.prisma.cartItem.delete({
                where: { userId, id: cartItemId },
            });
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            console.error("Помилка при видаленні товару з кошика:", error);
            throw new InternalServerErrorException("Помилка сервера при видаленні товару з кошика");
        }
    }

    async removeCartFromUser(userId: string) {
        try {
            return await this.prisma.cartItem.deleteMany({
                where: { userId },
            });
        } catch (error) {
            console.error("Помилка при очищенні кошика:", error);
            throw new InternalServerErrorException("Помилка сервера при очищенні кошика");
        }
    }
}
