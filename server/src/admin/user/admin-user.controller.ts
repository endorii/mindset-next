import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AdminUserService } from "./admin-user.service";

@Controller("admin/users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminUserController {
    constructor(private readonly adminUserService: AdminUserService) {}

    @Get()
    @Roles(Role.ADMIN)
    getAllUsers() {
        return this.adminUserService.getAllUsers();
    }
}
