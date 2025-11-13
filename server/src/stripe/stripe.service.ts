import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";
import Stripe from "stripe";

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ) {
        this.stripe = new Stripe(configService.get("STRIPE_SECRET_KEY")!, {
            apiVersion: "2025-10-29.clover",
        });
    }

    async createCheckoutSession(body: { orderId: string }) {
        const order = await this.prisma.order.findUnique({
            where: { id: body.orderId },
            include: { items: { include: { product: true } } },
        });

        if (!order) throw new NotFoundException("Order not found");

        const lineItems = order.items.map((item) => ({
            price_data: {
                currency: order.currency,
                product_data: {
                    name: item.product.name,
                },
                unit_amount: item.product.price * 100,
            },
            quantity: item.quantity,
        }));

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
            success_url: `${process.env.FRONTEND_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/order/cancel`,
            metadata: { orderId: order.id },
        });

        // збережи session.id у БД
        await this.prisma.order.update({
            where: { id: order.id },
            data: {
                stripeSessionId: session.id,
            },
        });

        return { url: session.url };
    }

    // Обробка Webhook від Stripe
    // handleWebhook(signature: string, rawBody: Buffer) {
    //     const webhookSecret: string = this.configService.get("STRIPE_SECRET_WEBHOOK_KEY")!;

    //     if (!webhookSecret) throw new InternalServerErrorException("webhook_secret not provided");

    //     let event: Stripe.Event;

    //     try {
    //         event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    //     } catch (err) {
    //         throw new Error(`Webhook signature verification failed: ${err.message}`);
    //     }

    //     // Обробка успішної оплати
    //     if (event.type === "checkout.session.completed") {
    //         const session = event.data.object as Stripe.Checkout.Session;
    //         // await this.createOrderFromSession(session);
    //     }

    //     return { received: true };
    // }
}
