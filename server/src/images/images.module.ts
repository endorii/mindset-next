import { Module } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [ImagesController],
    providers: [PrismaService],
})
export class ImagesModule {}
