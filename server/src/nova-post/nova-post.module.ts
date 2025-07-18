import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NovaPostController } from "./nova-post.controller";
import { NovaPostService } from "./nova-post.service";

@Module({
    imports: [ConfigModule],
    controllers: [NovaPostController],
    providers: [NovaPostService],
})
export class NovaPostModule {}
