import { HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ShopCartService } from "../cart/shop-cart.service";

@Injectable()
export class ShopOrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly shopCartService: ShopCartService
    ) {}

    async createOrder(createOrderDto: CreateOrderDto) {
        try {
            const {
                fullName,
                phoneNumber,
                email,
                area,
                city,
                postDepartment,
                additionalInfo,
                total,
                userId,
                items,
            } = createOrderDto;

            const order = await this.prisma.order.create({
                data: {
                    fullName,
                    phoneNumber,
                    email: email || "",
                    area,
                    city,
                    postDepartment,
                    additionalInfo,
                    total,
                    userId,
                    items: {
                        create: items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            color: item.color,
                            size: item.size,
                            type: item.type,
                        })),
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            await this.shopCartService.removeCartFromUser(userId);

            return {
                message: "Замовлення успішно створено",
                order,
            };
        } catch (error) {
            console.error("Помилка створення замовлення:", error);
            if (error instanceof HttpException) {
                throw error;
            }
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
