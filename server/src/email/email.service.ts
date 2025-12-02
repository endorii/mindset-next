import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as sgMail from "@sendgrid/mail";
import { Order, OrderItem, Product } from "generated/prisma";

interface SendGridError extends Error {
    code?: number;
    response?: {
        body?: {
            errors?: Array<{ message: string; field?: string; help?: string }>;
        };
    };
}

@Injectable()
export class EmailService {
    private readonly fromEmail: string;

    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.get<string>("SENDGRID_API_KEY");
        if (!apiKey) {
            console.error("SENDGRID_API_KEY не знайдено в змінних середовища!");
        } else {
            sgMail.setApiKey(apiKey);
        }

        this.fromEmail = this.configService.get<string>("MAIL_FROM")!;
    }

    private handleEmailError(error: unknown, context: string): void {
        console.error(`Error in ${context}:`, error);

        if (this.isSendGridError(error)) {
            if (error.response?.body) {
                console.error("SendGrid error details:", error.response.body);
            }
        }
    }

    private isSendGridError(error: unknown): error is SendGridError {
        return typeof error === "object" && error !== null && "response" in error;
    }

    async sendVerificationEmail(email: string, token: string) {
        const verificationUrl = `${this.configService.get<string>("FRONTEND_URL")}/auth/verify?token=${token}`;

        const msg = {
            to: email,
            from: this.fromEmail,
            subject: "Registration Verification",
            html: `
                <p>Please click the link below to verify your email:</p>
                <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
            `,
        };

        try {
            await sgMail.send(msg);
            console.log(`Verification email sent to ${email}`);
        } catch (error) {
            this.handleEmailError(error, "sendVerificationEmail");
            throw error;
        }
    }

    async sendPasswordResetEmail(email: string, token: string) {
        const verificationUrl = `${this.configService.get<string>("FRONTEND_URL")}/auth/reset-password?token=${token}`;

        const msg = {
            to: email,
            from: this.fromEmail,
            subject: "Reset password request",
            html: `
                <p>Please click the link below to reset your password:</p>
                <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
            `,
        };

        try {
            await sgMail.send(msg);
            console.log(`Password reset email sent to ${email}`);
        } catch (error) {
            this.handleEmailError(error, "sendPasswordResetEmail");
            throw error;
        }
    }

    async sendRegistrationEmail(email: string) {
        const msg = {
            to: email,
            from: this.fromEmail,
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
        };

        try {
            await sgMail.send(msg);
            console.log(`Registration email sent to ${email}`);
        } catch (error) {
            this.handleEmailError(error, "sendRegistrationEmail");
            throw error;
        }
    }

    async sendOrderCreatedEmail(order: Order & { items: (OrderItem & { product: Product })[] }) {
        const itemsHtml = order.items
            .map(
                (item, index) => `
            <tr>
                <td style="padding: 5px 10px; border: 1px solid #ddd;">${index + 1}</td>
                <td style="padding: 5px 10px; border: 1px solid #ddd;">${item.product.name}</td>
                <td style="padding: 5px 10px; border: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 5px 10px; border: 1px solid #ddd;">$${item.product.price}</td>
            </tr>
            `
            )
            .join("");

        const msg = {
            to: order.email,
            from: this.fromEmail,
            subject: `Your order #${order.userId || order.id} has been created`,
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
                            <th style="padding: 5px 10px; border: 1px solid #ddd; background-color: #f4f4f4;">#</th>
                            <th style="padding: 5px 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Product</th>
                            <th style="padding: 5px 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Quantity</th>
                            <th style="padding: 5px 10px; border: 1px solid #ddd; background-color: #f4f4f4;">Price</th>
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
        };

        try {
            await sgMail.send(msg);
            console.log(`Order confirmation email sent to ${order.email}`);
        } catch (error) {
            this.handleEmailError(error, "sendOrderCreatedEmail");
            throw error;
        }
    }
}
