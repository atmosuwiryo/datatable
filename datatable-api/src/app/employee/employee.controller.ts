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
import { PaginationRequestDto } from './dto/pagination-request.dto';
import { EmployeePagination } from './entities/employee-pagination.entity';

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
    type: EmployeePagination
  })
  @Get()
  async findAll( @Query() query?: PaginationRequestDto) {
    const { page, take, ...filter } = query;
    return this.employeeService.findAll(page, take, filter);
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
    return await this.employeeService.findOne({id});
  }

  @ApiOperation({
    summary: 'Update existing employee by id',
    description: 'Endpoint to update employee by id'
  })
  @ApiOkResponse({
    description: 'Employee data has been updated successfully',
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
