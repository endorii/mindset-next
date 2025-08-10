import { PartialType } from "@nestjs/swagger";
import { CreateOrderDto, CreateOrderItemDto } from "./create-order.dto";
import { IsOptional } from "class-validator";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsOptional()
    total?: number;

    @IsOptional()
    items?: CreateOrderItemDto[];

    @IsOptional()
    userId?: string;
}
