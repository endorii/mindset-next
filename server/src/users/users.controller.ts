import { Controller, Get, Body, Param, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(":email")
    findUserJohn(@Param("email") email: string) {
        return this.usersService.findUserJohn(email);
    }

    @Patch(":id")
    updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }
}
