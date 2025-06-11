import { Injectable } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
// import { UpdateTypeDto } from "./dto/update-type.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TypesService {
    constructor(private readonly prisma: PrismaService) {}

    async addType(createTypeDto: CreateTypeDto) {
        const { name } = createTypeDto;

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

    // findOne(id: number) {
    //   return `This action returns a #${id} type`;
    // }

    // update(id: number, updateTypeDto: UpdateTypeDto) {
    //   return `This action updates a #${id} type`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} type`;
    // }
}
