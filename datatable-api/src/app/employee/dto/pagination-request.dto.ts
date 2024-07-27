import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export enum OrderBy {
  NAME = 'name',
  DEPARTMENT = 'department',
  POSITION = 'position',
  DATE_OF_HIRE = 'dateOfHire',
}

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginationRequestDto {
  @ApiProperty({
    description: 'Page number',
    example: 1,
  })
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number;

  @ApiProperty({
    description: 'Number of items per page',
    type: Number,
    example: 20,
  })
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  take?: number;

  @ApiProperty({
    description: 'Name',
    type: String,
    example: 'John',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Department',
    type: String,
    example: 'Engineering',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({
    description: 'Position',
    type: String,
    example: 'Software Engineer',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  position?: string;

  @ApiProperty({
    description: 'Search query',
    type: String,
    example: 'John',
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Order by',
    enum: OrderBy,
    example: OrderBy.NAME,
    default: OrderBy.NAME
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @ApiProperty({
    description: 'Order direction',
    enum: OrderDirection,
    example: OrderDirection.ASC,
    default: OrderDirection.ASC
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderDirection)
  orderDirection?: OrderDirection;
}
