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
            console.error("Error fetching orders:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to fetch orders");
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
                throw new NotFoundException("Order with this ID does not exist");
            }

            const updatedOrder = await this.prisma.order.update({
                where: { id: orderId },
                data,
            });

            await this.adminRecentActions.createAction(userId, `Updated order ID:${orderId}`);

            return {
                message: "Order successfully updated",
                order: updatedOrder,
            };
        } catch (error) {
            console.error("Error updating order:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to update order");
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
                throw new NotFoundException("Order with this ID does not exist");
            }

            await this.prisma.order.delete({
                where: { id: orderId },
            });

            await this.adminRecentActions.createAction(userId, `Deleted order ID:${orderId}`);

            return {
                message: "Order deleted",
            };
        } catch (error) {
            console.error("Error deleting order:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to delete order");
        }
    }
}
