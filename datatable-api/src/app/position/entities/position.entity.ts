import { ApiProperty } from "@nestjs/swagger";
import { Position } from "@prisma/client";

export class PositionEntity implements Omit<Position, 'createdAt' | 'updatedAt'> {

  /**
   * The id of the position
   * @example: '611fee75-eb53-4b01-adf4-cd2d9be0c769'
   */
  @ApiProperty({
    description: 'Id of the position',
    example: '611fee75-eb53-4b01-adf4-cd2d9be0c769'
  })
  id: string

  /**
   * The name of the position
   * @example: 'Software Engineer'
   */
  @ApiProperty({
    description: 'Name of the position',
    example: 'Software Engineer'
  })
  name: string

  constructor( partial: Partial<Position> ) {
    Object.assign(this, {
      id: partial.id,
      name: partial.name
    });
  }
}
