import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationService } from '../services/pagination.service';
import { PrismaService } from '../services/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeePagination } from './entities/employee-pagination.entity';

@Injectable()
export class EmployeeService {

  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService<EmployeeEntity>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: createEmployeeDto
    });
  }

  // eslint-disable-next-line max-lines-per-function
  async findAll(page = 1, take = 10, filter): Promise<EmployeePagination> {
    const skip = (page - 1) * take;

    const query = {
      skip,
      take,
      include: {
        department: true,
        position: true
      },
      where: {}
    };

    if (Object.keys(filter).length > 0) {
      if ('search'in filter) {
        query['where'] = {
          OR: [
            { name: { contains: filter['search'], mode: 'insensitive' } },
            { department: { name: { contains: filter['search'], mode: 'insensitive' } } },
            { position: { name: { contains: filter['search'], mode: 'insensitive' } } }
          ]
        };
      }

      if ('orderBy' in filter) {

        let orderDirection = 'asc';  // init default order direction
        if ('orderDirection' in filter) {
          orderDirection = filter['orderDirection'];
        }

        if (filter['orderBy'] === 'department' || filter['orderBy'] === 'position') {
          query['orderBy'] = { [filter['orderBy']]: { name: orderDirection } };
        } else {
          query['orderBy'] = { [filter['orderBy']]: orderDirection };
        }

      }

      const queryFilter = [];
      let isQueryFilter = false;
      if ('name' in filter) {
        isQueryFilter = true;
        queryFilter.push({ name: { contains: filter['name'], mode: 'insensitive' } });
      }

      if ('department' in filter) {
        isQueryFilter = true;
        queryFilter.push({ department: { name: { contains: filter['department'], mode: 'insensitive' } } });
      }

      if ('position' in filter) {
        isQueryFilter = true;
        queryFilter.push({ position: { name: { contains: filter['position'], mode: 'insensitive' } } });
      }

      if (isQueryFilter) {
        query['where'] = { AND: queryFilter };
      }

    }

    const prismaQuery = this.prisma.employee.findMany(query);

    const [results, count] = await this.prisma.$transaction([
      prismaQuery, this.prisma.employee.count({ where: query.where }),
    ]);

    const employees = results.map(employee => {
      return new EmployeeEntity(employee);
    });

    return this.paginationService.paginate(count, take, employees);
  }

  async findOne(employeeWhereUniqueInput: Prisma.EmployeeWhereUniqueInput): Promise<EmployeeEntity> {
    const result = await this.prisma.employee.findUnique({
      where: employeeWhereUniqueInput,
      include: {
        department: true,
        position: true
      }
    });
    return new EmployeeEntity(result);
  }

  async update(where: Prisma.EmployeeWhereUniqueInput, updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeEntity> {
    const result = await this.prisma.employee.update({
      where: where,
      data: updateEmployeeDto,
      include: {
        department: true,
        position: true
      }
    });
    return new EmployeeEntity(result);
  }

  async remove(where: Prisma.EmployeeWhereUniqueInput): Promise<EmployeeEntity> {
    const result = await this.prisma.employee.delete({
      where: where,
      include: {
        department: true,
        position: true
      }
    });

    return new EmployeeEntity(result);
  }
}
