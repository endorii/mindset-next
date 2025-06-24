import { IsOptional, IsString, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

enum SortBy {
  name = 'name',
  createdAt = 'createdAt',
}

export class GetUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(500)
  limit?: number = 10;

  @ApiProperty({ required: false, enum: SortBy, default: SortBy.createdAt })
  @IsOptional()
  @IsString()
  sortBy?: SortBy = SortBy.createdAt;

  @ApiProperty({ required: false, enum: SortOrder, default: SortOrder.desc })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.desc;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  role?: string;
}
