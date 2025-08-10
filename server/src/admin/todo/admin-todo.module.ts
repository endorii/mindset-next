import { Module } from "@nestjs/common";
import { AdminTodoService } from "./admin-todo.service";
import { AdminTodoController } from "./admin-todo.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [AdminTodoController],
    providers: [AdminTodoService, PrismaService],
})
export class AdminTodoModule {}
