import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";

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
                subject: "Підтвердження реєстрації",
                html: `
                <p>Будь ласка, перейдіть за посиланням, щоб підтвердити свою пошту:</p>
                <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Підтвердити пошту</a>
            `,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(`Помилка під час відправки листа: ${error.message}`);
            } else {
                console.error("Невідома помилка під час відправки листа.");
            }
            throw new InternalServerErrorException("Не вдалося відправити лист верифікації.");
        }
    }
}
