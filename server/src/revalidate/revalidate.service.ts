import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RevalidateService {
    constructor(private readonly configService: ConfigService) {}

    async revalidate(path: string) {
        const nextUrl = this.configService.get<string>("FRONTEND_URL");
        const secret = this.configService.get<string>("REVALIDATE_SECRET");

        await fetch(`${nextUrl}/api/revalidate?secret=${secret}&path=${path}`, {
            method: "GET",
        });
    }
}
