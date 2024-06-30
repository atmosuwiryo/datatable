import { ApiProperty } from "@nestjs/swagger";
import { Department } from "@prisma/client";

export class DepartmentEntity implements Omit<Department, 'createdAt' | 'updatedAt'> {

  /**
   * The id of the department
   * @example: '611fee75-eb53-4b01-adf4-cd2d9be0c769'
   */
  @ApiProperty({
    description: 'Id of the department',
    example: '611fee75-eb53-4b01-adf4-cd2d9be0c769'
  })
  id: string

  /**
   * The name of the department
   * @example: 'HR'
   */
  @ApiProperty({
    description: 'Name of the department',
    example: 'HR'
  })
  name: string

  constructor( partial: Partial<Department> ) {
    Object.assign(this, {
      id: partial.id,
      name: partial.name
    });
  }
}
