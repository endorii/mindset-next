import { Injectable } from "@nestjs/common";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
// import { UpdateFavoriteDto } from "./dto/update-favorite.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FavoritesService {
    constructor(private readonly prisma: PrismaService) {}

    async addFavoriteToUser(userId: string, createFavoriteDto: CreateFavoriteDto) {
        const { productId, size, type, color } = createFavoriteDto;
        return this.prisma.favorite.create({
            data: {
                userId,
                productId,
                size,
                type,
                color,
            },
        });
    }

    async getAllFavoritesFromUser(userId: string) {
        return this.prisma.favorite.findMany({
            where: {
                userId,
            },
        });
    }

    async removeFromFavorites(userId: string, productId: string) {
        return this.prisma.favorite.deleteMany({
            where: {
                userId,
                productId,
            },
        });
    }
}
