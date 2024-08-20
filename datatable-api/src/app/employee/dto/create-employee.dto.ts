import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Employee } from "@prisma/client";
import { Transform } from 'class-transformer';
import { IsDateString, IsString, IsUUID } from 'class-validator';
import { randomUUID } from "crypto";

export class CreateEmployeeDto implements Omit<Employee, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty({
    description: 'Name of the employee',
    example: 'John Doe'
  })
  @IsString()
    name: string;

  @ApiProperty({
    description: 'Id of the department',
    example: randomUUID()
  })
  @IsUUID()
    departmentId: string;

  @ApiProperty({
    description: 'Id of the position',
    example: randomUUID()
  })
  @IsUUID()
    positionId: string;

  @ApiPropertyOptional({
    description: 'Date of hire',
    example: new Date().toISOString().split('T')[0],
  })
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString().split('T')[0])
    dateOfHire: Date;

}
