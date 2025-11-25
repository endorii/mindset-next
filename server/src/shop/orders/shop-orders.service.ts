import { Injectable } from "@nestjs/common";
import { OrderStatus } from "generated/prisma";
import { EmailService } from "src/email/email.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ShopCartService } from "../cart/shop-cart.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class ShopOrdersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly shopCartService: ShopCartService,
        private readonly emailService: EmailService
    ) {}

    async createOrder(createOrderDto: CreateOrderDto) {
        const productIds = createOrderDto.items.map((item) => item.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        const productMap = new Map(products.map((p) => [p.id, p]));

        const total =
            createOrderDto.items.reduce((acc, item) => {
                const product = productMap.get(item.productId);
                if (!product) return acc;
                return acc + product.price * item.quantity;
            }, 0) || 0;

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
            ...(createOrderDto.userId ? { user: { connect: { id: createOrderDto.userId } } } : {}),
        };

        const order = await this.prisma.order.create({
            data: orderData,
            include: {
                items: { include: { product: true } },
            },
        });

        await this.emailService.sendOrderCreatedEmail(order);

        if (createOrderDto.userId) {
            await this.shopCartService.removeCartFromUser(createOrderDto.userId);
        }

        return {
            message: "Order created successfully",
            data: order,
        };
    }

    async getOrdersByUserId(userId: string) {
        const orders = await this.prisma.order.findMany({
            where: { userId },
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

    async getOrderByStripeSessionId(sessionId: string) {
        const order = await this.prisma.order.findFirst({
            where: { stripeSessionId: sessionId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return order;
    }
}
