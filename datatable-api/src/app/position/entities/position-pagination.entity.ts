import { ApiProperty } from "@nestjs/swagger";
import { PositionEntity } from "./position.entity";

export class PositionPagination {

  @ApiProperty({
    description: 'Count of positions',
    example: 10
  })
  count: number

  @ApiProperty({
    description: 'Next page',
    example: 'http://localhost:3000/api/positions?page=1',
    type: String ,
    nullable: true
  })
  next: string | null;

  @ApiProperty({
    description: 'Previous page',
    example: 'http://localhost:3000/api/positions?page=2',
    type: String ,
    nullable: true
  })
  previous: string | null;

  @ApiProperty({
    description: 'Results of positions',
    type: [PositionEntity]
  })
  results: PositionEntity[]
}
