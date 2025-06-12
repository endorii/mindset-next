import { Injectable } from "@nestjs/common";
import { CreateSizeDto } from "./dto/create-size.dto";
// import { UpdateSizeDto } from "./dto/update-size.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SizesService {
    constructor(private readonly prisma: PrismaService) {}

    async addSize(createSizeDto: CreateSizeDto) {
        const { name } = createSizeDto;

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

    // findOne(id: number) {
    //   return `This action returns a #${id} size`;
    // }

    // update(id: number, updateSizeDto: UpdateSizeDto) {
    //   return `This action updates a #${id} size`;
    // }

    async deleteSize(sizeId: string) {
        return await this.prisma.size.delete({
            where: {
                id: sizeId,
            },
        });
    }
}
