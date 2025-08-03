import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "generated/prisma";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Roles(Role.ADMIN)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Patch("change-password")
    @Roles(Role.ADMIN, Role.USER)
    changePassword(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() data: { oldPassword: string; newPassword: string }
    ) {
        console.log(req.user.id);

        return this.userService.changePassword(req.user.id, data);
    }

    @Patch(":id")
    @Roles(Role.ADMIN, Role.USER)
    editUserInfo(@Param("id") userId: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.editUserInfo(userId, updateUserDto);
    }

    @Delete("")
    @Roles(Role.ADMIN, Role.USER)
    deleteUser(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() body: { password: string }
    ) {
        return this.userService.deleteAccount(req.user.id, body.password);
    }
}
