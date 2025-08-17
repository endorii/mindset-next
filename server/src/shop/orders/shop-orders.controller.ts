import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { ShopOrdersService } from "./shop-orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import {} from "./dto/update-order.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("shop/orders")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShopOrdersController {
    constructor(private readonly shopOrdersService: ShopOrdersService) {}

    @Post()
    @Public()
    // @Roles(Role.USER, Role.ADMIN)
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.shopOrdersService.createOrder(createOrderDto);
    }

    @Get("users")
    @Roles(Role.USER, Role.ADMIN)
    getOrdersByUserId(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        return this.shopOrdersService.getOrdersByUserId(req.user.id);
    }
}
