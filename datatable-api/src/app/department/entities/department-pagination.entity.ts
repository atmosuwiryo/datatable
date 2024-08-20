import { ApiProperty } from "@nestjs/swagger";

import { DepartmentEntity } from "./department.entity";

export class DepartmentPagination {

  @ApiProperty({
    description: 'Count of departments',
    example: 10
  })
    count: number;

  @ApiProperty({
    description: 'Next page',
    example: 'http://localhost:3000/api/departments?page=1',
    type: String ,
    nullable: true
  })
    next: string | null;

  @ApiProperty({
    description: 'Previous page',
    example: 'http://localhost:3000/api/departments?page=2',
    type: String ,
    nullable: true
  })
    previous: string | null;

  @ApiProperty({
    description: 'Results of departments',
    type: [DepartmentEntity]
  })
    results: DepartmentEntity[];
}
