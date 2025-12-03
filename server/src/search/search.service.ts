import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SearchService {
    constructor(private readonly prisma: PrismaService) {}

    async shopSearch(searchValue: string) {
        if (!searchValue.trim()) {
            return {
                collections: [],
                categories: [],
                products: [],
            };
        }

        const search = searchValue.trim();

        const [collections, categories, products] = await Promise.all([
            this.prisma.collection.findMany({
                where: {
                    OR: [
                        { name: { contains: search, mode: "insensitive" } },
                        { path: { contains: search, mode: "insensitive" } },
                    ],
                    isVisible: true,
                },
                select: {
                    id: true,
                    name: true,
                    path: true,
                    banner: true,
                },
            }),

            this.prisma.category.findMany({
                where: {
                    OR: [
                        { name: { contains: search, mode: "insensitive" } },
                        { path: { contains: search, mode: "insensitive" } },
                    ],
                    isVisible: true,
                },
                select: {
                    id: true,
                    name: true,
                    path: true,
                    banner: true,
                    collection: {
                        select: {
                            path: true,
                        },
                    },
                },
            }),

            this.prisma.product.findMany({
                where: {
                    OR: [
                        { name: { contains: search, mode: "insensitive" } },
                        { path: { contains: search, mode: "insensitive" } },
                    ],
                    isVisible: true,
                },
                select: {
                    id: true,
                    name: true,
                    path: true,
                    banner: true,
                    price: true,
                    images: true,
                    categoryId: true,
                    category: {
                        select: {
                            path: true,
                            collection: {
                                select: {
                                    path: true,
                                },
                            },
                        },
                    },
                },
            }),
        ]);

        return {
            collections,
            categories,
            products,
        };
    }
}
