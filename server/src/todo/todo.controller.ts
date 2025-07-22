import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "generated/prisma";
import { AuthenticatedRequestUser } from "src/auth/types/auth-request-user.type";

@Controller("todo")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @Roles(Role.ADMIN)
    createTodoItem(@Body() createTodoDto: CreateTodoDto) {
        return this.todoService.createTodoItem(createTodoDto);
    }

    @Get()
    @Roles(Role.ADMIN)
    getUserTodoList(@Req() req: Request & { user: AuthenticatedRequestUser }) {
        return this.todoService.getUserTodoList(req.user.id);
    }

    @Patch(":id")
    @Roles(Role.ADMIN)
    updateUserTodoItem(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("id") id: string,
        @Body() updateTodoDto: UpdateTodoDto
    ) {
        return this.todoService.updateUserTodoItem(id, req.user.id, updateTodoDto);
    }

    @Delete(":id")
    @Roles(Role.ADMIN)
    deleteUserTodoItem(
        @Req() req: Request & { user: AuthenticatedRequestUser },
        @Param("id") id: string
    ) {
        return this.todoService.deleteUserTodoItem(id, req.user.id);
    }
}
