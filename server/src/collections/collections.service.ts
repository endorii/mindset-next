import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

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

    async postCollection(createCollectionDto: CreateCollectionDto) {
        const { name, path, banner, views, status } = createCollectionDto;

        const existingCollection = await this.prisma.collection.findUnique({
            where: { path },
        });
        if (existingCollection) {
            throw new BadRequestException("Колекція з таким шляхом уже існує");
        }

        const collection = await this.prisma.collection.create({
            data: {
                name,
                path,
                banner,
                views,
                status,
            },
        });

        return {
            message: "Колекцію успішно створено",
            collection,
        };
    }

    async editCollection(collectionPath: string, updateCollectionDto: UpdateCollectionDto) {
        if (!updateCollectionDto) {
            throw new BadRequestException("Дані для оновлення не надано");
        }

        const { name, path, banner, status } = updateCollectionDto;

        const collection = await this.prisma.collection.update({
            where: {
                path: collectionPath,
            },
            data: {
                name,
                path,
                banner,
                status,
            },
        });

        return {
            message: "Колекцію успішно оновлено",
            collection,
        };
    }

    async deleteCollection(collectionPath: string) {
        await this.prisma.collection.delete({
            where: {
                path: collectionPath,
            },
        });

        return {
            message: "Колекцію успішно видалено",
        };
    }
}
