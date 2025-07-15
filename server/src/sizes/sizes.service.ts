import { ConflictException, Injectable } from "@nestjs/common";
import { CreateSizeDto } from "./dto/create-size.dto";
import { UpdateSizeDto } from "./dto/update-size.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SizesService {
    constructor(private readonly prisma: PrismaService) {}

    async addSize(createSizeDto: CreateSizeDto) {
        const { name } = createSizeDto;

        const existingSize = await this.prisma.size.findUnique({
            where: {
                name,
            },
        });

        if (existingSize) {
            throw new ConflictException("Розмір з такою назвою вже існує");
        }

        const size = await this.prisma.size.create({
            data: {
                name,
            },
        });

        return {
            message: "Розмір успішно створено",
            size,
        };
    }

    async getSizes() {
        return await this.prisma.size.findMany();
    }

    async editSize(sizeId: string, updateSizeDto: UpdateSizeDto) {
        const existingSize = await this.prisma.size.findUnique({
            where: {
                name: updateSizeDto.name,
            },
        });

        if (existingSize) {
            throw new ConflictException("Розмір з такою назвою вже існує");
        }

        return await this.prisma.size.update({
            where: {
                id: sizeId,
            },
            data: updateSizeDto,
        });
    }

    async deleteSize(sizeId: string) {
        return await this.prisma.size.delete({
            where: {
                id: sizeId,
            },
        });
    }
}
