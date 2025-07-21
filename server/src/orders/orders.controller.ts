import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";

@Controller("orders")
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @Roles(Role.USER, Role.ADMIN)
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.createOrder(createOrderDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    getOrders() {
        return this.ordersService.getOrders();
    }

    @Get("/users/:userId")
    @Roles(Role.USER, Role.ADMIN)
    getOrdersByUserId(@Param("userId") userId: string) {
        return this.ordersService.getOrdersByUserId(userId);
    }

    @Patch(":orderId")
    // @Roles(Role.ADMIN)
    updateOrder(@Param("orderId") orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.updateOrder(orderId, updateOrderDto);
    }

    @Delete(":orderId")
    @Roles(Role.ADMIN)
    deleteOrder(@Param("orderId") orderId: string) {
        return this.ordersService.deleteOrder(orderId);
    }
}
