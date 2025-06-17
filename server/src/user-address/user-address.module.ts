import { Module } from "@nestjs/common";
import { UserAddressService } from "./user-address.service";
import { UserAddressController } from "./user-address.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [UserAddressController],
    providers: [UserAddressService, PrismaService],
})
export class UserAddressModule {}
