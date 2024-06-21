import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiCreatedResponse, ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmployeeEntity } from './entities/employee.entity';
import { Prisma } from '@prisma/client';

@ApiTags('Employee')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({
    summary: 'Add new employee',
    description: 'Endpoint to add new employee'
  })
  @ApiCreatedResponse({
    description: 'Employee has been created successfully',
    type: EmployeeEntity
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @ApiOperation({
    summary: 'Retrieve list of employees',
    description: 'Endpoint to retrieve list of employee'
  })
  @ApiOkResponse({
    description: 'List of employee has been retrieved successfully',
    type: Array<EmployeeEntity>
  })
  @Get()
  async findAll(
    @Query() params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeeWhereUniqueInput,
    where?: Prisma.EmployeeWhereUniqueInput,
    orderBy?: Prisma.EmployeeOrderByWithRelationInput
  }) {
    const results = await this.employeeService.findAll(params);
    const employees = results.map( employee => {
      return new EmployeeEntity(employee)
    })
    return employees
  }

  @ApiOperation({
    summary: 'Retrieve employee by id',
    description: 'Endpoint to retrieve employee by id'
  })
  @ApiOkResponse({
    description: 'Employee data has been retrieved successfully',
    type: EmployeeEntity
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const employee = await this.employeeService.findOne({id});
    return new EmployeeEntity(employee)
  }

  @ApiOperation({
    summary: 'Edit existing employee by id',
    description: 'Endpoint to edit employee by id'
  })
  @ApiOkResponse({
    description: 'Employee data has been edited successfully',
    type: EmployeeEntity
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeeService.update({id}, updateEmployeeDto);
  }

  @ApiOperation({
    summary: 'Delete existing employee by id',
    description: 'Endpoint to delete employee by id'
  })
  @ApiOkResponse({
    description: 'Employee data has been deleted successfully',
    type: EmployeeEntity
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove({id});
  }
}
