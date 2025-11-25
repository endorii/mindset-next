import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ShopCollectionsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllCollections() {
        const collections = await this.prisma.collection.findMany({
            include: {
                categories: true,
            },
        });

        return collections;
    }

    async getCollectionByPath(collectionPath: string) {
        const collection = await this.prisma.collection.findUnique({
            where: { path: collectionPath },
            include: { categories: true },
        });

        if (!collection) {
            throw new NotFoundException("Collection with this path not found");
        }
        return collection;
    }
}
