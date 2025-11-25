import { Injectable, NotFoundException } from "@nestjs/common";
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
    }

    async updateOrder(userId: string, orderId: string, updateOrderDto: UpdateOrderDto) {
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
    }

    async deleteOrder(userId: string, orderId: string) {
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
    }
}
