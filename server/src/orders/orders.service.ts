import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "generated/prisma";

@Injectable()
export class OrdersService {
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

    async getOrders() {
        try {
            const orders = await this.prisma.order.findMany({
                include: {
                    items: {
                        include: {
                            product: true,
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

    async getOrdersByUserId(userId: string) {
        try {
            const orders = await this.prisma.order.findMany({
                where: {
                    userId,
                },
                include: {
                    items: {
                        include: {
                            product: true,
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

    async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { userId, items, ...data } = updateOrderDto;

            const order = await this.prisma.order.update({
                where: { id: orderId },
                data,
            });

            return {
                message: "Замовлення успішно оновлено",
                order,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new NotFoundException("Замовлення не знайдено");
            }
            throw new InternalServerErrorException("Не вдалося оновити замовлення");
        }
    }

    async deleteOrder(orderId: string) {
        try {
            const order = await this.prisma.order.delete({
                where: { id: orderId },
            });

            return {
                message: "Замовлення успішно видалено",
                order,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new NotFoundException("Замовлення не знайдено");
            }
            throw new InternalServerErrorException("Не вдалося видалити замовлення");
        }
    }
}
