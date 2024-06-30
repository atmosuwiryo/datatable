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
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PositionEntity } from './entities/position.entity';
import { PositionPagination } from './entities/position-pagination.entity';
import { PaginationRequestDto } from './dto/pagination-request.dto';

@ApiTags('Position')
@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @ApiOperation({
    summary: 'Add new position',
    description: 'Endpoint to add new position'
  })
  @ApiCreatedResponse({
    description: 'Position has been created successfully',
    type: PositionEntity
  })
  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @ApiOperation({
    summary: 'Retrieve list of positions',
    description: 'Endpoint to retrieve list of position'
  })
  @ApiCreatedResponse({
    description: 'List of position has been retrieved successfully',
    type: PositionPagination
  })
  @Get()
  findAll(@Query() query?: PaginationRequestDto) {
    const { page, take, ...filter } = query;
    return this.positionService.findAll(page, take, filter);
  }

  @ApiOperation({
    summary: 'Retrieve position by id',
    description: 'Endpoint to retrieve position by id'
  })
  @ApiCreatedResponse({
    description: 'Position data has been retrieved successfully',
    type: PositionEntity
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne({id});
  }

  @ApiOperation({
    summary: 'Update position by id',
    description: 'Endpoint to update position by id'
  })
  @ApiCreatedResponse({
    description: 'Position has been updated successfully',
    type: PositionEntity
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto
  ) {
    return this.positionService.update({ id }, updatePositionDto);
  }

  @ApiOperation({
    summary: 'Delete position by id',
    description: 'Endpoint to delete position by id'
  })
  @ApiCreatedResponse({
    description: 'Position has been deleted successfully',
    type: PositionEntity
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove({ id });
  }
}
