import { IsEnum, IsNotEmpty, IsString } from "class-validator";

enum TodoPriority {
    low = "low",
    medium = "medium",
    high = "high",
}

export class CreateTodoDto {
    @IsString({ message: "Value must be a string" })
    @IsNotEmpty({ message: "This field is required" })
    title: string;

    @IsEnum(TodoPriority, { message: "Value must be one of 'low', 'medium', or 'high'" })
    @IsNotEmpty({ message: "This field is required" })
    priority: TodoPriority;
}
