import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ShopCartService } from "../cart/shop-cart.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class ShopOrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly shopCartService: ShopCartService
    ) {}

    async createOrder(createOrderDto: CreateOrderDto) {
        try {
            const orderData = {
                fullName: createOrderDto.fullName,
                phoneNumber: createOrderDto.phoneNumber,
                email: createOrderDto.email || "",
                area: createOrderDto.area,
                city: createOrderDto.city,
                postDepartment: createOrderDto.postDepartment,
                additionalInfo: createOrderDto.additionalInfo,
                total: createOrderDto.total,
                paymentMethod: createOrderDto.paymentMethod,
                status: createOrderDto.status,
                items: {
                    create: createOrderDto.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        color: item.color,
                        size: item.size,
                        type: item.type,
                    })),
                },
                // Підключаємо користувача, якщо він авторизований
                ...(createOrderDto.userId
                    ? { user: { connect: { id: createOrderDto.userId } } }
                    : {}),
            };

            const order = await this.prisma.order.create({
                data: orderData,
                include: {
                    items: { include: { product: true } },
                },
            });

            if (createOrderDto.userId) {
                await this.shopCartService.removeCartFromUser(createOrderDto.userId);
            }

            return {
                message: "Замовлення успішно створено",
                order,
            };
        } catch (error) {
            console.error("Помилка створення замовлення:", error);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Помилка сервера при створенні замовлення");
        }
    }

    async getOrdersByUserId(userId: string) {
        try {
            const orders = await this.prisma.order.findMany({
                where: {
                    userId,
                },
                include: {
                    items: {
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

            return orders;
        } catch (error) {
            console.error("Помилка отримання замовлень:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати замовлення");
        }
    }
}
