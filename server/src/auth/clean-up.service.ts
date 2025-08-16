import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CleanupService {
    constructor(private readonly prisma: PrismaService) {}

    // Запускати кожен день о 3:00 ранку
    @Cron("0 3 * * *")
    async deleteExpiredUnverifiedUsers() {
        await this.prisma.user.deleteMany({
            where: {
                isVerified: false,
                verificationTokenExpires: { lt: new Date() },
            },
        });
        console.log("Непідтверджені користувачі видалені");
    }
}
