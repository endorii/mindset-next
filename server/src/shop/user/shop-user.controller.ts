import { Body, Controller, Delete, Patch, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ShopUserService } from "./shop-user.service";

@Controller("shop/users")
@UseGuards(JwtAccessGuard, RolesGuard)
export class ShopUserController {
    constructor(private readonly shopUserService: ShopUserService) {}

    @Patch()
    @Roles(Role.admin, Role.user)
    editUserInfo(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.shopUserService.editUserInfo(req.user.id, updateUserDto);
    }

    @Delete()
    @Roles(Role.admin, Role.user)
    deleteUser(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() body: { password: string }
    ) {
        return this.shopUserService.deleteAccount(req.user.id, body.password);
    }

    @Patch("change-password")
    @Roles(Role.admin, Role.user)
    changePassword(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() data: { oldPassword: string; newPassword: string }
    ) {
        return this.shopUserService.changePassword(req.user.id, data);
    }
}
