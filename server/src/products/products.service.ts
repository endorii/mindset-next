import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
// import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async getProduct(collectionPath: string, categoryPath: string, productPath: string) {
        try {
            const product = await this.prisma.product.findFirst({
                where: {
                    path: productPath,
                    category: {
                        path: categoryPath,
                        collection: {
                            path: collectionPath,
                        },
                    },
                },
                include: {
                    colors: true,
                    category: {
                        include: {
                            collection: true,
                        },
                    },
                },
            });

            if (!product) throw new Error("Продукт не знайдено");

            return product;
        } catch (error) {
            console.error("Помилка отримання продукту:", error);
            throw new Error("Не вдалося отримати продукт.");
        }
    }

    async postProduct(createProductDto: CreateProductDto) {
        const {
            name,
            path,
            views,
            status,
            categoryId,
            price,
            available,
            description,
            composition,
            banner,
            images,
        } = createProductDto;
        try {
            return await this.prisma.product.create({
                data: {
                    name,
                    path,
                    price,
                    available,
                    description,
                    composition,
                    views,
                    status,
                    categoryId,
                    banner,
                    images,
                },
            });
        } catch (error) {
            console.error("Помилка створення категорії:", error);
            throw new Error("Не вдалося створити категорію");
        }
    }
}
