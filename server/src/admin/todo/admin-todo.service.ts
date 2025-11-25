import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Injectable()
export class AdminTodoService {
    constructor(private readonly prisma: PrismaService) {}

    async getUserTodoList(userId: string) {
        return await this.prisma.todo.findMany({
            where: {
                userId,
            },
        });
    }

    async createTodoItem(userId: string, createTodoDto: CreateTodoDto) {
        const todo = await this.prisma.todo.create({
            data: { userId, ...createTodoDto },
        });

        return {
            message: "Todo item successfully created",
            todo,
        };
    }

    async updateUserTodoItem(userId: string, todoId: string, updateTodoDto: UpdateTodoDto) {
        const todo = await this.prisma.todo.findUniqueOrThrow({
            where: { id: todoId, userId },
        });

        if (!todo) {
            throw new NotFoundException(`Todo item with ID ${todoId} not found`);
        }

        const updatingTodo = await this.prisma.todo.update({
            where: {
                id: todoId,
                userId,
            },
            data: updateTodoDto,
        });

        return {
            message: "Todo item successfully updated",
            todo: updatingTodo,
        };
    }

    async deleteUserTodoItem(userId: string, todoId: string) {
        const todo = await this.prisma.todo.findUniqueOrThrow({
            where: { id: todoId, userId },
        });

        if (!todo) {
            throw new NotFoundException(`Todo item with ID ${todoId} not found`);
        }

        await this.prisma.todo.delete({
            where: {
                id: todoId,
            },
        });

        return {
            message: "Todo item deleted",
        };
    }
}
