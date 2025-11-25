import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OrderStatus, PaymentStatus } from "generated/prisma";
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
                currency: "usd",
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

        await this.prisma.order.update({
            where: { id: order.id },
            data: {
                stripeSessionId: session.id,
            },
        });

        return { url: session.url };
    }

    async handleWebhook(req: Request & { body: Buffer }, signature: string) {
        const webhookSecret: string = this.configService.get("STRIPE_SECRET_WEBHOOK_KEY")!;

        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        } catch (err: unknown) {
            const error = err as Error;
            console.error("Webhook signature failed:", error.message);
            return;
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            await this.updateOrderAfterPayment(session);
        }
    }

    private async updateOrderAfterPayment(session: Stripe.Checkout.Session) {
        const orderId = session.metadata?.orderId;

        console.log("Session metadata:", session.metadata);

        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) throw new NotFoundException("Order not found");

        try {
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    status: OrderStatus.paid,
                    paymentStatus: PaymentStatus.paid,
                    stripePaymentIntentId:
                        typeof session.payment_intent === "string"
                            ? session.payment_intent
                            : (session.payment_intent?.id ?? null),
                    stripeCustomerId:
                        typeof session.customer === "string"
                            ? session.customer
                            : (session.customer?.id ?? null),
                },
            });
            console.log("Order updated successfully");
        } catch (err) {
            console.error("Failed to update order:", err);
        }
    }
}
