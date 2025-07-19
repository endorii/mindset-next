import { Controller, Get, Post, Body, Param, Delete, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
// import { UpdateOrderDto } from "./dto/update-order.dto";
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
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.ordersService.findOne(+id);
    }

    // @Patch(":id")
    // update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    //     return this.ordersService.update(+id, updateOrderDto);
    // }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.ordersService.remove(+id);
    }
}
