import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthRoleGuard } from "src/auth/jwt-auth-role.guard";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "./enum/role.enum";
// import { ChangePasswordDto } from "./dto/change-password.dto";
import { UserResponseDto } from "./dto/user-response.dto.";

@Controller("users")
@ApiTags("users")
@ApiBearerAuth()
@UseGuards(JwtAuthRoleGuard())
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiCreatedResponse({ type: UserResponseDto })
    @Roles(Role.Admin)
    async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.userService.create(createUserDto);
    }

    @Get(":id")
    @ApiOkResponse({ type: UserResponseDto })
    @Roles(Role.Admin)
    async findOne(@Param("id") id: string): Promise<UserResponseDto> {
        return this.userService.findOne(id);
    }

    @Patch(":id")
    @ApiOkResponse()
    @Roles(Role.Admin, Role.User)
    async update(
        @Param("id") id: string,
        @Body() updateUserDto: UpdateUserDto,
        @Request() req
    ): Promise<UserResponseDto> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        return this.userService.update(id, updateUserDto, req.user);
    }

    // @Post("change-password")
    // @ApiOkResponse({ type: UserResponseDto })
    // @Roles(Role.User)
    // async changePassword(
    //     @Body() changePasswordDto: ChangePasswordDto,
    //     @Request() req
    // ): Promise<UserResponseDto> {
    //     return this.userService.changePassword(changePasswordDto, req.user);
    // }
}
