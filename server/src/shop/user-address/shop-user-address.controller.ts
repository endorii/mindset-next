import { Body, Controller, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";
import { ShopUserAddressService } from "./shop-user-address.service";

@Controller("shop/user-address")
@UseGuards(JwtAccessGuard, RolesGuard)
export class ShopUserAddressController {
    constructor(private readonly shopUserAddressService: ShopUserAddressService) {}

    @Post()
    @Roles(Role.admin, Role.user)
    addUserAddress(@Body() createUserAddressDto: CreateUserAddressDto) {
        return this.shopUserAddressService.addUserAddress(createUserAddressDto);
    }

    @Patch()
    @Roles(Role.admin, Role.user)
    updateUserAddress(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() updateUserAddressDto: UpdateUserAddressDto
    ) {
        return this.shopUserAddressService.updateUserAddress(req.user.id, updateUserAddressDto);
    }
}
