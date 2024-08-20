import { ApiProperty } from "@nestjs/swagger";

import { EmployeeEntity } from "./employee.entity";

export class EmployeePagination {
  @ApiProperty({
    description: 'Count of employees',
    example: 10
  })
    count: number;

  @ApiProperty({
    description: 'Next page',
    example: 'http://localhost:3000/api/employees?page=1',
    type: String ,
    nullable: true
  })
    next: string | null;

  @ApiProperty({
    description: 'Previous page',
    example: 'http://localhost:3000/api/employees?page=2',
    type: String ,
    nullable: true
  })
    previous: string | null;

  @ApiProperty({
    description: 'Results of employees',
    type: [EmployeeEntity]
  })
    results: EmployeeEntity[];
}
