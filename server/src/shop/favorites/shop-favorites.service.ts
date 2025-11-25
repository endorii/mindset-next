import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";

@Injectable()
export class ShopFavoritesService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllFavoritesFromUser(userId: string) {
        const favorites = await this.prisma.favorite.findMany({
            where: { userId },
            select: {
                productId: true,
            },
        });

        return favorites.map((fav) => fav.productId);
    }

    async addFavoriteToUser(userId: string, createFavoriteDto: CreateFavoriteDto) {
        const { productId } = createFavoriteDto;

        const existingFavorite = await this.prisma.favorite.findUnique({
            where: {
                userId_productId: { userId, productId },
            },
        });

        if (existingFavorite) {
            throw new ConflictException("Product is already added to favorites");
        }

        await this.prisma.favorite.create({
            data: {
                userId,
                productId,
            },
        });

        return { message: "Product added to favorites" };
    }

    async removeFromFavorites(userId: string, productId: string) {
        const existingFavoriteItem = await this.prisma.favorite.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });

        if (!existingFavoriteItem) {
            throw new NotFoundException("Product not found in favorites");
        }

        await this.prisma.favorite.delete({
            where: {
                userId_productId: {
                    userId,
                    productId,
                },
            },
        });

        return { message: "Product removed from favorites" };
    }
}
