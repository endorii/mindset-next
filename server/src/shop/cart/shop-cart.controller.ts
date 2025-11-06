import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { CreateCartDto } from "./dto/create-cart.dto";
import { ShopCartService } from "./shop-cart.service";

@Controller("shop/cart")
@UseGuards(JwtAccessGuard, RolesGuard)
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
