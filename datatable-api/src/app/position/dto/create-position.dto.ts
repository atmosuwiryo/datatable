import { ApiProperty } from "@nestjs/swagger";
import { Position } from "@prisma/client";
import { IsString } from "class-validator";

export class CreatePositionDto implements Omit<Position, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty({
    description: 'Name of the position',
    example: 'Software Engineer'
  })
  @IsString()
    name: string;
}
