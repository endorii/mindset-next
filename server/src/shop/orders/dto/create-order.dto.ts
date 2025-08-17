import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsArray,
    ValidateNested,
    IsNumber,
    IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { OrderStatus } from "generated/prisma";

export class CreateOrderItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    color: string;

    @IsString()
    size: string;

    @IsString()
    type: string;
}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsNotEmpty()
    area: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    postDepartment: string;

    @IsOptional()
    @IsString()
    additionalInfo?: string;

    @IsNumber()
    @Type(() => Number)
    total: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];

    @IsString()
    @IsOptional()
    userId?: string;

    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;
}
