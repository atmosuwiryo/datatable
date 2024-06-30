import { ApiProperty } from "@nestjs/swagger";
import { Department } from "@prisma/client";
import { IsString } from "class-validator";

export class CreateDepartmentDto implements Omit<Department, 'id' | 'createdAt' | 'updatedAt'>{
@ApiProperty({
  description: 'Name of the department',
  example: 'HR'
})
  @IsString()
  name: string;
}
