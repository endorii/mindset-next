import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateOrderDto } from "src/shop/orders/dto/update-order.dto";
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

            return orders;
        } catch (error) {
            console.error("Помилка отримання замовлень:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати замовлення");
        }
    }

    async updateOrder(userId: string, orderId: string, updateOrderDto: UpdateOrderDto) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { items, ...data } = updateOrderDto;

            const order = await this.prisma.order.findUnique({
                where: {
                    id: orderId,
                },
            });

            if (!order) {
                throw new NotFoundException("Замовлення з таким ID не існує");
            }

            const updatedOrder = await this.prisma.order.update({
                where: { id: orderId },
                data,
            });

            await this.adminRecentActions.createAction(userId, `Оновлено замовлення ID:${orderId}`);

            return {
                message: "Замовлення успішно оновлено",
                order: updatedOrder,
            };
        } catch (error) {
            console.error("Помилка оновлення замовлення:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося оновити замовлення");
        }
    }

    async deleteOrder(userId: string, orderId: string) {
        try {
            const order = await this.prisma.order.findUnique({
                where: {
                    id: orderId,
                },
            });

            if (!order) {
                throw new NotFoundException("Замовлення з таким ID не існує");
            }

            await this.prisma.order.delete({
                where: { id: orderId },
            });

            await this.adminRecentActions.createAction(userId, `Видалено замовлення ID:${orderId}`);

            return {
                message: "Замовлення видалено",
            };
        } catch (error) {
            console.error("Помилка видалення замовлення:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося видалити замовлення");
        }
    }
}
