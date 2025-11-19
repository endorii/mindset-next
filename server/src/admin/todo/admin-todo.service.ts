import {
    HttpException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Injectable()
export class AdminTodoService {
    constructor(private readonly prisma: PrismaService) {}

    async getUserTodoList(userId: string) {
        try {
            const todos = await this.prisma.todo.findMany({
                where: {
                    userId,
                },
            });

            return todos;
        } catch (error: unknown) {
            console.error("Error fetching todo list:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to fetch todo list");
        }
    }

    async createTodoItem(userId: string, createTodoDto: CreateTodoDto) {
        try {
            const todo = await this.prisma.todo.create({
                data: { userId, ...createTodoDto },
            });

            return {
                message: "Todo item successfully created",
                todo,
            };
        } catch (error: unknown) {
            console.error("Error creating todo item:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to create todo item");
        }
    }

    async updateUserTodoItem(userId: string, todoId: string, updateTodoDto: UpdateTodoDto) {
        try {
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
        } catch (error: unknown) {
            console.error("Error updating todo item:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to update todo item");
        }
    }

    async deleteUserTodoItem(userId: string, todoId: string) {
        try {
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
        } catch (error: unknown) {
            console.error("Error deleting todo item:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Failed to delete todo item");
        }
    }
}
