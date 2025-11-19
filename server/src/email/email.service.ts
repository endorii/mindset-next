import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
    constructor(
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService
    ) {}

    async sendVerificationEmail(email: string, token: string) {
        const verificationUrl = `${this.configService.get<string>("FRONTEND_URL")}/auth/verify?token=${token}`;

        try {
            await this.mailerService.sendMail({
                to: email,
                subject: "Registration Verification",
                html: `
                <p>Please click the link below to verify your email:</p>
                <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
            `,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Error sending email: ${error.message}`);
            } else {
                console.error("Unknown error occurred while sending email.");
            }
            throw new InternalServerErrorException("Failed to send verification email.");
        }
    }
}
