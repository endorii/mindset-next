import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "generated/prisma";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Patch(":id")
    @Roles(Role.ADMIN, Role.USER)
    editUserInfo(@Param("id") userId: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.editUserInfo(userId, updateUserDto);
    }
}
