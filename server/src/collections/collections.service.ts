import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";

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
}
