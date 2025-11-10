import {
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
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
        try {
            const { productId } = createFavoriteDto;

            const existingFavorite = await this.prisma.favorite.findUnique({
                where: {
                    userId_productId: { userId, productId },
                },
            });

            if (existingFavorite) {
                throw new ConflictException("Товар вже додано до вподобних");
            }

            await this.prisma.favorite.create({
                data: {
                    userId,
                    productId,
                },
            });

            return { message: "Товар додано до вподобаних" };
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            console.error("Помилка при додаванні у вподобані:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Помилка сервера при додаванні у вподобані");
        }
    }

    async removeFromFavorites(userId: string, productId: string) {
        try {
            const existingFavoriteItem = await this.prisma.favorite.findUnique({
                where: {
                    userId_productId: {
                        userId,
                        productId,
                    },
                },
            });

            if (!existingFavoriteItem) {
                throw new NotFoundException("Товар у вподобаних не знайдений");
            }

            await this.prisma.favorite.delete({
                where: {
                    userId_productId: {
                        userId,
                        productId,
                    },
                },
            });

            return { message: "Товар видалено з вподобаних" };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error("Помилка при видаленні з вподобаних:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Помилка сервера при видаленні з вподобаних");
        }
    }
}
