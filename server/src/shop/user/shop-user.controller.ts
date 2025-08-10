import { Body, Controller, Delete, Patch, Req, UseGuards } from "@nestjs/common";
import { ShopUserService } from "./shop-user.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "generated/prisma";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("shop/users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShopUserController {
    constructor(private readonly shopUserService: ShopUserService) {}

    @Patch()
    @Roles(Role.ADMIN, Role.USER)
    editUserInfo(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.shopUserService.editUserInfo(req.user.id, updateUserDto);
    }

    @Delete()
    @Roles(Role.ADMIN, Role.USER)
    deleteUser(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() body: { password: string }
    ) {
        return this.shopUserService.deleteAccount(req.user.id, body.password);
    }

    @Patch("change-password")
    @Roles(Role.ADMIN, Role.USER)
    changePassword(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() data: { oldPassword: string; newPassword: string }
    ) {
        return this.shopUserService.changePassword(req.user.id, data);
    }
}
