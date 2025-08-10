import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { AdminTodoService } from "./admin-todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("admin/todo")
@UseGuards(JwtAuthGuard, RolesGuard)
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
