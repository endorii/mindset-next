import { Type } from "class-transformer";
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";
import { OrderStatus, PaymentMethod } from "generated/prisma";

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
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    area: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    postDepartment: string;

    @IsString()
    @IsNotEmpty()
    paymentMethod: PaymentMethod;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    total?: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];

    @IsString()
    @IsOptional()
    userId?: string;

    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus;
}
