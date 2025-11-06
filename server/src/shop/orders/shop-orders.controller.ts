import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { CreateOrderDto } from "./dto/create-order.dto";
import {} from "./dto/update-order.dto";
import { ShopOrdersService } from "./shop-orders.service";

@Controller("shop/orders")
@UseGuards(JwtAccessGuard, RolesGuard)
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
