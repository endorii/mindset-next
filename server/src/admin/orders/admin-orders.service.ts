import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "generated/prisma";
import { AdminRecentActionsService } from "../recent-actions/admin-recent-actions.service";

@Injectable()
export class AdminOrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adminRecentActions: AdminRecentActionsService
    ) {}

    async getOrders() {
        try {
            const orders = await this.prisma.order.findMany({
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

    async updateOrder(userId: string, orderId: string, updateOrderDto: UpdateOrderDto) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { items, ...data } = updateOrderDto;

            const order = await this.prisma.order.update({
                where: { id: orderId },
                data,
            });

            await this.adminRecentActions.createAction(
                userId,
                `Оновлено замовлення ID:${order.id}`
            );

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

    async deleteOrder(userId: string, orderId: string) {
        try {
            const order = await this.prisma.order.delete({
                where: { id: orderId },
            });

            await this.adminRecentActions.createAction(
                userId,
                `Видалено замовлення ID:${order.id}`
            );

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
