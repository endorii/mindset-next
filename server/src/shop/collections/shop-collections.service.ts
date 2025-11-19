import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ShopCollectionsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllCollections() {
        try {
            const collections = await this.prisma.collection.findMany({
                include: {
                    categories: true,
                },
            });

            return collections;
        } catch (error) {
            console.error("Error fetching collections:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to fetch collections");
        }
    }

    async getCollectionByPath(collectionPath: string) {
        try {
            const collection = await this.prisma.collection.findUnique({
                where: { path: collectionPath },
                include: { categories: true },
            });

            if (!collection) {
                throw new NotFoundException("Collection with this path not found");
            }
            return collection;
        } catch (error) {
            console.error("Error fetching collection:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to fetch collection");
        }
    }
}
