import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationService } from '../services/pagination.service';
import { PrismaService } from '../services/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentEntity } from './entities/department.entity';
import { DepartmentPagination } from './entities/department-pagination.entity';

@Injectable()
export class DepartmentService {

  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService<DepartmentEntity>
  ) {}


  async create(createDepartmentDto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: createDepartmentDto
    });
  }

  async findAll(page = 1, take = 10, filter): Promise<DepartmentPagination> {
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
          ],
        };
      }
    }

    if ('orderDirection' in filter) {
      query['orderBy'] = { name : filter['orderDirection'] };
    }

    const prismaQuery = this.prisma.department.findMany(query);

    const [results, count] = await this.prisma.$transaction([
      prismaQuery,
      this.prisma.department.count({ where: query.where })
    ]);

    const departments = results.map((department) => new DepartmentEntity(department));

    return this.paginationService.paginate(count, take, departments);
  }

  async findOne(departmentWhereUniqueInput: Prisma.DepartmentWhereUniqueInput): Promise<DepartmentEntity> {
    const result = await this.prisma.department.findUniqueOrThrow({
      where: departmentWhereUniqueInput
    });
    return new DepartmentEntity(result);
  }

  async update(where: Prisma.DepartmentWhereUniqueInput, updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentEntity> {
    const result = await this.prisma.department.update({
      where,
      data: updateDepartmentDto
    });
    return new DepartmentEntity(result);
  }

  async remove(where: Prisma.DepartmentWhereUniqueInput): Promise<DepartmentEntity> {
    const result = await this.prisma.department.delete({
      where
    });
    return new DepartmentEntity(result);
  }
}
