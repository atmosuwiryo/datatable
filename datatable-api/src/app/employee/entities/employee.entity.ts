import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Employee } from '@prisma/client'
import { Transform } from 'class-transformer'

export class EmployeeEntity implements Omit<Employee, 'id' | 'departmentId' | 'positionId' | 'createdAt' | 'updatedAt'> {
  @ApiProperty({
    description: 'Name of the employee',
    example: 'John Doe'
  })
  name: string;
  @ApiProperty({
    description: 'Name of the department',
    example: 'Engineering'
  })
  department: string;
  @ApiProperty({
    description: 'Name of the position',
    example: 'Software Engineer'
  })
  position: string;
  @ApiPropertyOptional({
    description: 'Date of hire',
    example: new Date().toISOString().split('T')[0],
  })
  @Transform(({ value }) => new Date(value).toISOString().split('T')[0])
  dateOfHire: Date;
}
