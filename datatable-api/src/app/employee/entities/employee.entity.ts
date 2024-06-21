import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Employee, Department, Position } from '@prisma/client'
import { Transform } from 'class-transformer'
import { randomUUID } from 'crypto';

/**
 * This class is used to represent the employee entity
 * @example
 * const employee = new EmployeeEntity({
 *   name: 'John Doe',
 *   department: 'Engineering',
 *   position: 'Software Engineer',
 *   dateOfHire: '2022-01-01',
 * });
 */
export class EmployeeEntity implements Omit<Employee, 'departmentId' | 'positionId' | 'createdAt' | 'updatedAt'> {
  @ApiProperty({
    description: 'Id of the employee',
    example: randomUUID()
  })
  id: string;

  /**
  * @description
  * The name of the employee
  * @example John Doe
  */
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
  dateOfHire: Date;

  constructor( partial: Partial<Employee> & {department: Department} & {position: Position} ) {
    Object.assign(this,  {
      id: partial.id,
      name: partial.name,
      department: partial.department.name,
      position: partial.position.name,
      dateOfHire: partial.dateOfHire.toISOString().split('T')[0]
    })
  }
}
