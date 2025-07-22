import { IsEnum, IsNotEmpty, IsString } from "class-validator";

enum TodoPriority {
    low = "low",
    medium = "medium",
    high = "high",
}

export class CreateTodoDto {
    @IsString({ message: "Значення повинно бути рядком" })
    @IsNotEmpty({ message: "Обов'язкове поле" })
    title: string;

    @IsEnum(TodoPriority, { message: "Значення повинно бути рядком 'low', 'medium' або 'high'" })
    @IsNotEmpty({ message: "Обов'язкове поле" })
    priority: TodoPriority;

    @IsString()
    @IsNotEmpty({ message: "Обов'язкове поле" })
    userId: string;
}
