import { Controller, Post, Body, Patch, Param, UseGuards } from "@nestjs/common";
import { UserAddressService } from "./user-address.service";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";

@Controller("user-address")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserAddressController {
    constructor(private readonly userAddressService: UserAddressService) {}

    @Post()
    @Roles(Role.ADMIN || Role.USER)
    addUserAddress(@Body() createUserAddressDto: CreateUserAddressDto) {
        return this.userAddressService.addUserAddress(createUserAddressDto);
    }

    @Patch(":userId")
    @Roles(Role.ADMIN || Role.USER)
    updateUserAddress(
        @Param("userId") userId: string,
        @Body() updateUserAddressDto: UpdateUserAddressDto
    ) {
        return this.userAddressService.updateUserAddress(userId, updateUserAddressDto);
    }
}
