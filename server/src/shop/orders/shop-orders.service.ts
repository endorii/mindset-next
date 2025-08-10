import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "generated/prisma";

@Injectable()
export class ShopOrdersService {
    constructor(private readonly prisma: PrismaService) {}
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

            await this.prisma.cartItem.deleteMany({
                where: {
                    userId: createOrderDto.userId,
                },
            });

            return {
                message: "Замовлення успішно створено",
                order,
            };
        } catch (error) {
            console.error("Помилка створення замовлення:", error);
            throw error;
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

            if (orders.length === 0) {
                throw new NotFoundException("Замовлень не знайдено");
            }

            return orders;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new NotFoundException("Замовлення не знайдено");
            }
            throw new InternalServerErrorException("Не вдалося отримати замовлення");
        }
    }
}
