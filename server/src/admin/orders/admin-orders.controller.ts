import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { UpdateOrderDto } from "src/shop/orders/dto/update-order.dto";
import { AdminOrdersService } from "./admin-orders.service";

@Controller("admin/orders")
@UseGuards(JwtAccessGuard, RolesGuard)
export class AdminOrdersController {
    constructor(private readonly adminOrdersService: AdminOrdersService) {}

    @Get()
    @Roles(Role.admin)
    getOrders() {
        return this.adminOrdersService.getOrders();
    }

    @Patch(":orderId")
    @Roles(Role.admin)
    updateOrder(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("orderId") orderId: string,
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        return this.adminOrdersService.updateOrder(req.user.id, orderId, updateOrderDto);
    }

    @Delete(":orderId")
    @Roles(Role.admin)
    deleteOrder(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("orderId") orderId: string
    ) {
        return this.adminOrdersService.deleteOrder(req.user.id, orderId);
    }
}
