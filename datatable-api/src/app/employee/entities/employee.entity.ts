import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Employee, Department, Position } from '@prisma/client'
import { randomUUID } from 'crypto';

/**
 * Class to represent the employee entity
 */
export class EmployeeEntity implements Omit<Employee, 'departmentId' | 'positionId' | 'createdAt' | 'updatedAt'> {

  /**
  * The id of the employee
  * @example 611fee75-eb53-4b01-adf4-cd2d9be0c769
  */
  @ApiProperty({
    description: 'Id of the employee',
    example: randomUUID()
  })
  id: string;

  /**
  * The name of the employee
  * @example John Doe
  */
  @ApiProperty({
    description: 'Name of the employee',
    example: 'John Doe'
  })
  name: string;

  /**
  * The department of the employee
  * @example Engineering
  */
  @ApiProperty({
    description: 'Name of the department',
    example: 'Engineering'
  })
  department: string;

  /**
  * The position of the employee
  * @example Software Engineer
  */
  @ApiProperty({
    description: 'Name of the position',
    example: 'Software Engineer'
  })
  position: string;

  /**
  * The date of hire of the employee
  * @example 2022-01-01
  */
  @ApiPropertyOptional({
    description: 'Date of hire',
    example: new Date().toISOString().split('T')[0],
  })
  dateOfHire: Date;

  /**
  * The constructor of the EmployeeEntity
  * @param partial
  */
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

