import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Role } from "generated/prisma";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAccessGuard } from "src/auth/guards/jwt/jwt-access.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { AuthenticatedRequestUser } from "src/auth/interfaces/auth-request-user";
import { AdminTodoService } from "./admin-todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller("admin/todo")
@UseGuards(JwtAccessGuard, RolesGuard)
export class AdminTodoController {
    constructor(private readonly adminTodoService: AdminTodoService) {}

    @Post()
    @Roles(Role.ADMIN)
    createTodoItem(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Body() createTodoDto: CreateTodoDto
    ) {
        return this.adminTodoService.createTodoItem(req.user.id, createTodoDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    getUserTodoList(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        return this.adminTodoService.getUserTodoList(req.user.id);
    }

    @Patch(":todoId")
    @Roles(Role.ADMIN)
    updateUserTodoItem(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("todoId") todoId: string,
        @Body() updateTodoDto: UpdateTodoDto
    ) {
        return this.adminTodoService.updateUserTodoItem(req.user.id, todoId, updateTodoDto);
    }

    @Delete(":todoId")
    @Roles(Role.ADMIN)
    deleteUserTodoItem(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("todoId") todoId: string
    ) {
        return this.adminTodoService.deleteUserTodoItem(req.user.id, todoId);
    }
}
