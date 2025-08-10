import { Controller, Post, Body, Patch, UseGuards, Req } from "@nestjs/common";
import { ShopUserAddressService } from "./shop-user-address.service";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("shop/user-address")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShopUserAddressController {
    constructor(private readonly shopUserAddressService: ShopUserAddressService) {}

    @Post()
    @Roles(Role.ADMIN, Role.USER)
    addUserAddress(@Body() createUserAddressDto: CreateUserAddressDto) {
        return this.shopUserAddressService.addUserAddress(createUserAddressDto);
    }

    @Patch()
    @Roles(Role.ADMIN, Role.USER)
    updateUserAddress(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() updateUserAddressDto: UpdateUserAddressDto
    ) {
        return this.shopUserAddressService.updateUserAddress(req.user.id, updateUserAddressDto);
    }
}
