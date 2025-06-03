import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "generated/prisma";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    image: any;
    async onModuleInit() {
        await this.$connect();
    }
}
