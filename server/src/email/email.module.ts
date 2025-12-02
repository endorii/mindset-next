import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailService } from "./email.service";

@Module({
    imports: [
        ConfigModule,
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                transport: {
                    host: config.get<string>("MAIL_HOST"),
                    port: Number(config.get<string>("MAIL_PORT")),
                    secure: config.get<string>("MAIL_SECURE") === "true",
                    auth: {
                        user: config.get<string>("MAIL_USER"),
                        pass: config.get<string>("MAIL_PASS"),
                    },
                },
                defaults: {
                    from: `"No Reply" <${config.get<string>("MAIL_USER")}>`,
                },
            }),
        }),
    ],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}
