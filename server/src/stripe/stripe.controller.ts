import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/auth/decorators/public.decorator";
import { StripeService } from "./stripe.service";

@Controller("stripe")
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}

    @Post("checkout")
    @Public()
    async createCheckout(@Body() body: { orderId: string }) {
        return this.stripeService.createCheckoutSession(body);
    }

    // @Post("webhook")
    // @Public()
    // async handleWebhook(
    //     @Req() req: Request,
    //     @Res() res: Response,
    //     @Headers("stripe-signature") signature: string
    // ) {
    //     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    //     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    //         apiVersion: "2025-10-29.clover",
    //     });

    //     let event: Stripe.Event;

    //     try {
    //         const rawBody = (req as any).rawBody || req.body;
    //         event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    //     } catch (err) {
    //         console.error("⚠️ Webhook signature verification failed.", err.message);
    //         return res.status(400).send(`Webhook Error: ${err.message}`);
    //     }

    //     await this.stripeService.handleWebhookEvent(event);
    //     res.json({ received: true });
    // }
}
