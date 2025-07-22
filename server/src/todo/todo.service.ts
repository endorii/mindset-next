import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) {}
    async createTodoItem(createTodoDto: CreateTodoDto) {
        try {
            const todoItem = await this.prisma.todo.create({
                data: createTodoDto,
            });

            return {
                message: "Завдання успішно створено",
                todoItem,
            };
        } catch (error) {
            console.error("Помилка створення завдання:", error);
            throw new Error("Не вдалося створити завдання");
        }
    }

    async getUserTodoList(userId: string) {
        try {
            const todoList = await this.prisma.todo.findMany({
                where: {
                    userId,
                },
            });

            return todoList;
        } catch (error) {
            console.error("Помилка отримання списку завдань:", error);
            throw new Error("Не вдалося отримати список завдань");
        }
    }

    async updateUserTodoItem(id: string, userId: string, updateTodoDto: UpdateTodoDto) {
        try {
            const todoItem = await this.prisma.todo.update({
                where: {
                    id,
                    userId,
                },
                data: updateTodoDto,
            });

            return {
                message: "Завдання успішно оновлено",
                todoItem,
            };
        } catch (error) {
            console.error("Помилка оновлення завдання:", error);
            throw new Error("Не вдалося оновити завдання");
        }
    }

    async deleteUserTodoItem(id: string, userId: string) {
        try {
            const todoItem = await this.prisma.todo.findUnique({
                where: { id, userId },
            });

            if (!todoItem) throw new Error("Колекцію не знайдено");

            await this.prisma.todo.delete({
                where: {
                    id,
                },
            });

            return {
                message: "Завдання успішно видалено",
                todoItem,
            };
        } catch (error) {
            console.error("Помилка видалення завдання:", error);
            throw new Error("Не вдалося видалити завдання");
        }
    }
}
