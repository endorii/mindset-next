import { Injectable } from "@nestjs/common";
// import { CreateCollectionDto } from "./dto/create-collection.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CollectionsService {
    constructor(private readonly prisma: PrismaService) {}

    async getCollections() {
        return this.prisma.collection.findMany({
            include: {
                categories: true,
            },
        });
    }

    async getCollection(collectionPath: string) {
        return await this.prisma.collection.findUnique({
            where: { path: collectionPath },
            include: { categories: { include: { products: true } } },
        });
    }

    // async postCollection(createCollectionDto: CreateCollectionDto) {
    //     return this.prisma.collection.create({
    //         data: createCollectionDto,
    //     });
    // }

    // async deleteCollection(id: string) {
    //     try {
    //         const existing = await this.prisma.collection.findUnique({ where: { id } });

    //         if (!existing) {
    //             throw new NotFoundException(`Collection with id ${id} not found`);
    //         }

    //         return await this.prisma.collection.delete({
    //             where: { id },
    //         });
    //     } catch (error) {
    //         console.error("Delete error:", error);
    //         throw new InternalServerErrorException("Failed to delete collection");
    //     }
    // }
}
