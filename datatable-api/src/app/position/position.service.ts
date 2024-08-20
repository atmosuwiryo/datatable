import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationService } from '../services/pagination.service';
import { PrismaService } from '../services/prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionEntity } from './entities/position.entity';
import { PositionPagination } from './entities/position-pagination.entity';

@Injectable()
export class PositionService {

  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService<PositionEntity>
  ) {}

  async create(createPositionDto: CreatePositionDto) {
    return this.prisma.position.create({
      data: createPositionDto
    });
  }

  async findAll(page = 1, take = 10, filter): Promise<PositionPagination> {
    const skip = (page - 1) * take;
    const query = {
      skip,
      take,
      where: {}
    };

    if (Object.keys(filter).length > 0) {
      if ('search' in filter) {
        query['where'] = {
          OR: [
            { name: { contains: filter['search'], mode: 'insensitive' } }
          ]
        };
      }
    }

    if ('orderDirection' in filter) {
      query['orderBy'] = { name : filter['orderDirection'] };
    }

    const prismaQuery = this.prisma.position.findMany(query);

    const [results, count] = await this.prisma.$transaction([
      prismaQuery,
      this.prisma.position.count({ where: query.where })
    ]);

    const positions = results.map((position) => new PositionEntity(position));

    return this.paginationService.paginate(count, take, positions);
  }

  async findOne(positionWhereUniqueInput: Prisma.PositionWhereUniqueInput): Promise<PositionEntity> {
    const result = await this.prisma.position.findUnique({
      where: positionWhereUniqueInput
    });
    return new PositionEntity(result);
  }

  async update(where: Prisma.PositionWhereUniqueInput, updatePositionDto: UpdatePositionDto): Promise<PositionEntity> {
    const result = await this.prisma.position.update({
      where,
      data: updatePositionDto
    });
    return new PositionEntity(result);
  }

  async remove(where: Prisma.PositionWhereUniqueInput): Promise<PositionEntity> {
    const result = await this.prisma.position.delete({
      where
    });
    return new PositionEntity(result);
  }
}
