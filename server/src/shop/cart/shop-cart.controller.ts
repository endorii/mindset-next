import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { ShopCartService } from "./shop-cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("shop/cart")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShopCartController {
    constructor(private readonly shopCartService: ShopCartService) {}

    @Get()
    @Roles(Role.ADMIN, Role.USER)
    getAllCartItemsFromUser(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        return this.shopCartService.getAllCartItemsFromUser(req.user.id);
    }

    @Post()
    @Roles(Role.ADMIN, Role.USER)
    addCartItemToUser(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() createCartDto: CreateCartDto
    ) {
        return this.shopCartService.addCartItemToUser(req.user.id, createCartDto);
    }

    @Delete(":cartItemId")
    @Roles(Role.ADMIN, Role.USER)
    removeCartItemFromUser(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("cartItemId") cartItemId: string
    ) {
        return this.shopCartService.removeCartItemFromUser(req.user.id, cartItemId);
    }

    @Delete()
    @Roles(Role.ADMIN, Role.USER)
    removeCartFromUser(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        return this.shopCartService.removeCartFromUser(req.user.id);
    }
}
