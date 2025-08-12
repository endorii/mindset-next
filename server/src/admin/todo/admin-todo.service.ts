import {
    Injectable,
    InternalServerErrorException,
    HttpException,
    NotFoundException,
} from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { PrismaService } from "src/prisma/prisma.service";

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
            console.error("Помилка отримання списку завдань:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося отримати список завдань");
        }
    }

    async createTodoItem(userId: string, createTodoDto: CreateTodoDto) {
        try {
            const todo = await this.prisma.todo.create({
                data: { userId, ...createTodoDto },
            });

            return {
                message: "Завдання успішно створено",
                todo,
            };
        } catch (error: unknown) {
            console.error("Помилка створення завдання:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося створити завдання");
        }
    }

    async updateUserTodoItem(userId: string, todoId: string, updateTodoDto: UpdateTodoDto) {
        try {
            const todo = await this.prisma.todo.findUniqueOrThrow({
                where: { id: todoId, userId },
            });

            if (!todo) {
                throw new NotFoundException("Завдання з тамки ID не знайдено");
            }

            const updatingTodo = await this.prisma.todo.update({
                where: {
                    id: todoId,
                    userId,
                },
                data: updateTodoDto,
            });

            return {
                message: "Завдання успішно оновлено",
                todo: updatingTodo,
            };
        } catch (error: unknown) {
            console.error("Помилка оновлення завдання:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося оновити завдання");
        }
    }

    async deleteUserTodoItem(userId: string, todoId: string) {
        try {
            const todo = await this.prisma.todo.findUniqueOrThrow({
                where: { id: todoId, userId },
            });

            if (!todo) {
                throw new NotFoundException("Завдання з тамки ID не знайдено");
            }

            await this.prisma.todo.delete({
                where: {
                    id: todoId,
                },
            });

            return {
                message: "Завдання видалено",
            };
        } catch (error: unknown) {
            console.error("Помилка видалення завдання:", error);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Не вдалося видалити завдання");
        }
    }
}
