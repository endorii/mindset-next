import { Controller, Get, Body, Param, Delete, UseGuards, Patch, Req } from "@nestjs/common";
import { AdminOrdersService } from "./admin-orders.service";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("admin/orders")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminOrdersController {
    constructor(private readonly adminOrdersService: AdminOrdersService) {}

    @Get()
    @Roles(Role.ADMIN)
    getOrders() {
        return this.adminOrdersService.getOrders();
    }

    @Patch(":orderId")
    @Roles(Role.ADMIN)
    updateOrder(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("orderId") orderId: string,
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        return this.adminOrdersService.updateOrder(req.user.id, orderId, updateOrderDto);
    }

    @Delete(":orderId")
    @Roles(Role.ADMIN)
    deleteOrder(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("orderId") orderId: string
    ) {
        return this.adminOrdersService.deleteOrder(req.user.id, orderId);
    }
}
