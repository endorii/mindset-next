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
@Roles(Role.admin, Role.user)
export class ShopUserController {
    constructor(private readonly shopUserService: ShopUserService) {}

    @Patch()
    editUserInfo(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.shopUserService.editUserInfo(req.user.id, updateUserDto);
    }

    @Delete()
    deleteUser(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() body: { password: string }
    ) {
        return this.shopUserService.deleteAccount(req.user.id, body.password);
    }

    @Patch("change-password")
    changePassword(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() data: { oldPassword: string; newPassword: string }
    ) {
        return this.shopUserService.changePassword(req.user.id, data);
    }

    @Patch("set-password")
    setPassword(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() data: { password: string; confirmPassword: string }
    ) {
        return this.shopUserService.setPassword(req.user.id, data);
    }
}
