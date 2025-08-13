import { Module } from "@nestjs/common";
import { MonoPayService } from "./mono-pay.service";
import { MonoPayController } from "./mono-pay.controller";

@Module({
    controllers: [MonoPayController],
    providers: [MonoPayService],
})
export class MonoPayModule {}
