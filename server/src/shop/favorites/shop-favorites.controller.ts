import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";

import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { ShopFavoritesService } from "./shop-favorites.service";

@Controller("shop/favorites")
@UseGuards(JwtAccessGuard, RolesGuard)
export class ShopFavoritesController {
    constructor(private readonly shopFavoritesService: ShopFavoritesService) {}

    @Get()
    @Roles(Role.admin, Role.user)
    getAllFavoritesFromUser(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        return this.shopFavoritesService.getAllFavoritesFromUser(req.user.id);
    }

    @Post()
    @Roles(Role.admin, Role.user)
    addFavoriteToUser(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() createFavoriteDto: CreateFavoriteDto
    ) {
        return this.shopFavoritesService.addFavoriteToUser(req.user.id, createFavoriteDto);
    }

    @Delete(":productId")
    @Roles(Role.admin, Role.user)
    removeFavorite(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("productId") productId: string
    ) {
        return this.shopFavoritesService.removeFromFavorites(req.user.id, productId);
    }
}
