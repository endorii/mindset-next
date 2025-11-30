import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Order, OrderItem, Product } from "generated/prisma";

@Injectable()
export class EmailService {
    constructor(
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService
    ) {}

    async sendVerificationEmail(email: string, token: string) {
        const verificationUrl = `${this.configService.get<string>("FRONTEND_URL")}/auth/verify?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: "Registration Verification",
            html: `
                <p>Please click the link below to verify your email:</p>
                <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
            `,
        });
    }

    async sendPasswordResetEmail(email: string, token: string) {
        const verificationUrl = `${this.configService.get<string>("FRONTEND_URL")}/auth/reset-password?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: "Reset password request",
            html: `
                <p>Please click the link below to reset your password:</p>
                <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
            `,
        });
    }

    async sendRegistrationEmail(email: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: "Account successfully created",
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Your account at <strong>Mindset</strong> has been successfully created.</p>
                <p>You can now log in using your email and password.</p>
                
                <p style="margin-top: 20px; color: #555;">
                    If you did not register this account, please ignore this email.
                </p>
            </div>
        `,
        });
    }

    async sendOrderCreatedEmail(order: Order & { items: (OrderItem & { product: Product })[] }) {
        const itemsHtml = order.items
            .map(
                (item, index) => `
            <tr>
                <td style="padding: 5px 10px; border: 1px solid #ddd;">${index + 1}</td>
                <td style="padding: 5px 10px; border: 1px solid #ddd;">${item.product.name}</td>
                <td style="padding: 5px 10px; border: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 5px 10px; border: 1px solid #ddd;">${item.product.price}</td>
            </tr>
        `
            )
            .join("");

        await this.mailerService.sendMail({
            to: order.email,
            subject: `Your order #${order.userId || ""} has been created`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Order Confirmation</h2>
                <p>Dear <strong>${order.fullName}</strong>,</p>
                <p>Your order has been successfully created with the following details:</p>
                
                <h3>Delivery Information:</h3>
                <p>
                    <strong>Phone:</strong> ${order.phoneNumber}<br/>
                    <strong>Area:</strong> ${order.area}<br/>
                    <strong>City:</strong> ${order.city}<br/>
                    <strong>Post Department:</strong> ${order.postDepartment}<br/>
                    <strong>Payment Method:</strong> ${order.paymentMethod}<br/>
                    ${order.total ? `<strong>Total:</strong> $${order.total}<br/>` : ""}
                </p>

                <h3>Order Items:</h3>
                <table style="border-collapse: collapse; width: 100%;">
                    <thead>
                        <tr>
                            <th style="padding: 5px 10px; border: 1px solid #ddd;">#</th>
                            <th style="padding: 5px 10px; border: 1px solid #ddd;">Product</th>
                            <th style="padding: 5px 10px; border: 1px solid #ddd;">Quantity</th>
                            <th style="padding: 5px 10px; border: 1px solid #ddd;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>

                <p style="margin-top: 20px; color: #555;">
                    Thank you for shopping with Mindset!
                </p>
            </div>
        `,
        });
    }
}
