import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { ShopFavoritesService } from "./shop-favorites.service";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";

@Controller("shop/favorites")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShopFavoritesController {
    constructor(private readonly shopFavoritesService: ShopFavoritesService) {}

    @Get()
    @Roles(Role.ADMIN, Role.USER)
    getAllFavoritesFromUser(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        return this.shopFavoritesService.getAllFavoritesFromUser(req.user.id);
    }

    @Post()
    @Roles(Role.ADMIN, Role.USER)
    addFavoriteToUser(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() createFavoriteDto: CreateFavoriteDto
    ) {
        return this.shopFavoritesService.addFavoriteToUser(req.user.id, createFavoriteDto);
    }

    @Delete(":productId")
    @Roles(Role.ADMIN, Role.USER)
    removeFavorite(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("productId") productId: string
    ) {
        return this.shopFavoritesService.removeFromFavorites(req.user.id, productId);
    }
}
