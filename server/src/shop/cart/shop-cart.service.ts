import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    HttpException,
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
            if (error instanceof HttpException) {
                throw error;
            }
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

            await this.prisma.cartItem.create({
                data: {
                    userId,
                    productId: createCartDto.productId,
                    size: createCartDto.size,
                    type: createCartDto.type,
                    color: createCartDto.color,
                    quantity: createCartDto.quantity,
                },
            });

            return {
                message: "Товар додано до кошика",
            };
        } catch (error) {
            console.error("Помилка при додаванні товару до кошика:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException(
                "Помилка сервера про додаванні товару до кошика"
            );
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

            await this.prisma.cartItem.delete({
                where: { userId, id: cartItemId },
            });

            return { message: "Товар видалено з кошика" };
        } catch (error) {
            console.error("Помилка при видаленні товару з кошика:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Помилка сервера при видаленні товару з кошика");
        }
    }

    async removeCartFromUser(userId: string) {
        try {
            const cart = await this.prisma.cartItem.deleteMany({
                where: { userId },
            });

            if (!cart) {
                throw new NotFoundException("Товарів у корзині не знайдено");
            }

            return { message: "Кошик очищено", cart };
        } catch (error) {
            console.error("Помилка при очищенні кошика:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Помилка сервера при очищенні кошика");
        }
    }
}
