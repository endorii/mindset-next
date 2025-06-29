import { Controller, Get, Post, Body, Param, Delete, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";

@Controller("cart")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post(":userId")
    @Roles(Role.ADMIN || Role.USER)
    addCartItemToUser(@Param("userId") userId: string, @Body() createCartDto: CreateCartDto) {
        return this.cartService.addCartItemToUser(userId, createCartDto);
    }

    @Get(":userId")
    @Roles(Role.ADMIN || Role.USER)
    getAllCartItemsFromUser(@Param("userId") userId: string) {
        return this.cartService.getAllCartItemsFromUser(userId);
    }

    @Delete(":userId/:productId")
    @Roles(Role.ADMIN || Role.USER)
    removeCartItemFromUser(@Param("userId") userId: string, @Param("productId") productId: string) {
        return this.cartService.removeCartItemFromUser(userId, productId);
    }
}
