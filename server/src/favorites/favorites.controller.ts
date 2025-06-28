import { Controller, Get, Post, Body, Param, Delete, UseGuards } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";

@Controller("favorites")
@UseGuards(JwtAuthGuard, RolesGuard)
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post(":userId")
    @Roles(Role.ADMIN || Role.USER)
    addFavoriteToUser(
        @Param("userId") userId: string,
        @Body() createFavoriteDto: CreateFavoriteDto
    ) {
        return this.favoritesService.addFavoriteToUser(userId, createFavoriteDto);
    }

    @Get(":userId")
    @Roles(Role.ADMIN || Role.USER)
    getAllFavoritesFromUser(@Param("userId") userId: string) {
        return this.favoritesService.getAllFavoritesFromUser(userId);
    }

    @Delete(":userId/:productId")
    @Roles(Role.ADMIN || Role.USER)
    removeFavorite(@Param("userId") userId: string, @Param("productId") productId: string) {
        return this.favoritesService.removeFromFavorites(userId, productId);
    }
}
