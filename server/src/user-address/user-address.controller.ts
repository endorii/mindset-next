import { Controller, Post, Body, Patch, Param } from "@nestjs/common";
import { UserAddressService } from "./user-address.service";
import { CreateUserAddressDto } from "./dto/create-user-address.dto";
import { UpdateUserAddressDto } from "./dto/update-user-address.dto";

@Controller("user-address")
export class UserAddressController {
    constructor(private readonly userAddressService: UserAddressService) {}

    @Post()
    addUserAddress(@Body() createUserAddressDto: CreateUserAddressDto) {
        return this.userAddressService.addUserAddress(createUserAddressDto);
    }

    @Patch(":userId")
    updateUserAddress(
        @Param("userId") userId: string,
        @Body() updateUserAddressDto: UpdateUserAddressDto
    ) {
        return this.userAddressService.updateUserAddress(userId, updateUserAddressDto);
    }
}
