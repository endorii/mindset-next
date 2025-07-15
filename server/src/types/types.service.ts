import { ConflictException, Injectable } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateTypeDto } from "./dto/update-type.dto";

@Injectable()
export class TypesService {
    constructor(private readonly prisma: PrismaService) {}

    async addType(createTypeDto: CreateTypeDto) {
        const { name } = createTypeDto;

        const existingType = await this.prisma.type.findUnique({
            where: {
                name,
            },
        });

        if (existingType) {
            throw new ConflictException("Тип з такою назвою вже існує");
        }

        const type = await this.prisma.type.create({
            data: {
                name,
            },
        });

        return {
            message: "Тип успішно створено",
            type,
        };
    }

    async getTypes() {
        return await this.prisma.type.findMany();
    }

    async editType(typeId: string, updateTypeDto: UpdateTypeDto) {
        const existingType = await this.prisma.type.findUnique({
            where: {
                name: updateTypeDto.name,
            },
        });

        if (existingType) {
            throw new ConflictException("Тип з такою назвою вже існує");
        }

        return await this.prisma.type.update({
            where: {
                id: typeId,
            },
            data: updateTypeDto,
        });
    }

    async deleteType(typeId: string) {
        return await this.prisma.type.delete({
            where: {
                id: typeId,
            },
        });
    }
}
