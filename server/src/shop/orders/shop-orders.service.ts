import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { OrderStatus } from "generated/prisma";
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
            // 1️⃣ Отримуємо усі продукти по productId
            const productIds = createOrderDto.items.map((item) => item.productId);
            const products = await this.prisma.product.findMany({
                where: { id: { in: productIds } },
            });

            // 2️⃣ Створюємо мапу для швидкого доступу до ціни
            const productMap = new Map(products.map((p) => [p.id, p]));

            // 3️⃣ Обчислюємо total
            const total =
                createOrderDto.items.reduce((acc, item) => {
                    const product = productMap.get(item.productId);
                    if (!product) return acc; // якщо товар не знайдено
                    return acc + product.price * item.quantity;
                }, 0) || 0;

            // 4️⃣ Готуємо дані замовлення
            const orderData = {
                fullName: createOrderDto.fullName,
                phoneNumber: createOrderDto.phoneNumber,
                email: createOrderDto.email,
                area: createOrderDto.area,
                city: createOrderDto.city,
                postDepartment: createOrderDto.postDepartment,
                total,
                status: OrderStatus.pending,
                paymentMethod: createOrderDto.paymentMethod,
                items: {
                    create: createOrderDto.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        color: item.color,
                        size: item.size,
                        type: item.type,
                    })),
                },
                ...(createOrderDto.userId
                    ? { user: { connect: { id: createOrderDto.userId } } }
                    : {}),
            };

            // 5️⃣ Створюємо замовлення
            const order = await this.prisma.order.create({
                data: orderData,
                include: {
                    items: { include: { product: true } },
                },
            });

            // 6️⃣ Якщо користувач авторизований — очищаємо його кошик
            if (createOrderDto.userId) {
                await this.shopCartService.removeCartFromUser(createOrderDto.userId);
            }

            return {
                message: "Замовлення успішно створено",
                data: order,
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
