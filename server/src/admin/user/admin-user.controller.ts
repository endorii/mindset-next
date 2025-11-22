import { Controller, Get, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AdminUserService } from "./admin-user.service";

@Controller("admin/users")
@UseGuards(JwtAccessGuard, RolesGuard)
export class AdminUserController {
    constructor(private readonly adminUserService: AdminUserService) {}

    @Get()
    @Roles(Role.admin)
    getAllUsers() {
        return this.adminUserService.getAllUsers();
    }
}
