import { Injectable } from "@nestjs/common";
import { CreateColorDto } from "./dto/create-color.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateColorDto } from "./dto/update-color.dto";

@Injectable()
export class ColorsService {
    constructor(private readonly prisma: PrismaService) {}

    async addColor(createColorDto: CreateColorDto) {
        const { name, hexCode } = createColorDto;

        const color = await this.prisma.color.create({
            data: {
                name,
                hexCode,
            },
        });

        return {
            message: "Колір успішно створено",
            color,
        };
    }

    async getColors() {
        return await this.prisma.color.findMany();
    }

    async editColor(colorId: string, updateColorDto: UpdateColorDto) {
        return await this.prisma.color.update({
            where: {
                id: colorId,
            },
            data: updateColorDto,
        });
    }

    async deleteColor(colorId: string) {
        return await this.prisma.color.delete({
            where: {
                id: colorId,
            },
        });
    }
}
