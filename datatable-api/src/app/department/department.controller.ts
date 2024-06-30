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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentEntity } from './entities/department.entity';
import { PaginationRequestDto } from './dto/pagination-request.dto';

@ApiTags('Department')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation(({
    summary: 'Add new department',
    description: 'Endpoint to add new department'
  }))
  @ApiCreatedResponse({
    description: 'Department has been created successfully',
    type: DepartmentEntity
  })
  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @ApiOperation({
    summary: 'Retrieve list of departments',
    description: 'Endpoint to retrieve list of department'
  })
  @ApiCreatedResponse({
    description: 'List of department has been retrieved successfully',
    type: DepartmentEntity
  })
  @Get()
  async findAll(@Query() query?: PaginationRequestDto) {
    const { page, take, ...filter } = query;
    return this.departmentService.findAll(page, take, filter);
  }

  @ApiOperation({
    summary: 'Retrieve department by id',
    description: 'Endpoint to retrieve department by id'
  })
  @ApiOkResponse({
    description: 'Department data has been retrieved successfully',
    type: DepartmentEntity
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.departmentService.findOne({id});
  }

  @ApiOperation({
    summary: 'Edit existing department by id',
    description: 'Endpoint to edit department by id'
  })
  @ApiOkResponse({
    description: 'Department has been edited successfully',
    type: DepartmentEntity
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ) {
    return this.departmentService.update({id}, updateDepartmentDto);
  }

  @ApiOperation({
    summary: 'Delete existing department by id',
    description: 'Endpoint to delete department by id'
  })
  @ApiOkResponse({
    description: 'Department has been deleted successfully',
    type: DepartmentEntity
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.departmentService.remove({id});
  }
}
