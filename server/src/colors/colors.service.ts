import { Injectable } from "@nestjs/common";
import { CreateColorDto } from "./dto/create-color.dto";
// import { UpdateColorDto } from "./dto/update-color.dto";
import { PrismaService } from "src/prisma/prisma.service";

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

    // findOne(id: number) {
    //     return `This action returns a #${id} color`;
    // }

    // update(id: number, updateColorDto: UpdateColorDto) {
    //     return `This action updates a #${id} color`;
    // }

    async deleteColor(colorId: string) {
        return await this.prisma.color.delete({
            where: {
                id: colorId,
            },
        });
    }
}
