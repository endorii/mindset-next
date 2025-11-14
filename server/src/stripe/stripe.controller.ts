import { Body, Controller, Headers, Post, Req } from "@nestjs/common";
import { Public } from "src/auth/decorators/public.decorator";
import { StripeService } from "./stripe.service";

@Controller("stripe")
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}

    @Post("checkout")
    @Public()
    createCheckout(@Body() body: { orderId: string }) {
        return this.stripeService.createCheckoutSession(body);
    }

    @Post("webhook")
    @Public()
    handleWebhook(
        @Req() req: Request & { body: Buffer },
        @Headers("stripe-signature") signature: string
    ) {
        return this.stripeService.handleWebhook(req, signature);
    }
}
