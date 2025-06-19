import { Controller, Get, Body, Param, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //   return this.userService.create(createUserDto);
    // }

    // @Get()
    // findAll() {
    //     return this.userService.findAll();
    // }

    @Get(":email")
    findUserJohn(@Param("email") email: string) {
        return this.usersService.findUserJohn(email);
    }

    @Patch(":id")
    updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    // @Delete(":id")
    // remove(@Param("id") id: string) {
    //     return this.userService.remove(+id);
    // }
}
