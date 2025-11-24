import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RevalidateService } from "./revalidate.service";

@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [RevalidateService],
})
export class RevalidateModule {}
