import { Module } from "@nestjs/common";
import { AdminUserService } from "./admin-user.service";
import { AdminUserController } from "./admin-user.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [AdminUserController],
    providers: [AdminUserService, PrismaService],
})
export class AdminUserModule {}
