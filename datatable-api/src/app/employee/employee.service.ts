import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../services/prisma.service';
import { Department, Employee, Position, Prisma } from '@prisma/client';
import { EmployeeEntity } from './entities/employee.entity';
import { PaginationService } from '../services/pagination.service';
import { EmployeePagination } from './entities/employee-pagination.entity';

@Injectable()
export class EmployeeService {

  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService<EmployeeEntity>
  ){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: createEmployeeDto
    })
  }

  async findAll(page = 1, take = 10, filter)
  : Promise<EmployeePagination> {
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
            { name: { contains: filter['search'] } },
            { department: { name: { contains: filter['search'] } } },
            { position: { name: { contains: filter['search'] } } }
          ]
        }
      }

      if ('orderBy' in filter) {

        if ('orderDirection' in filter) {
          query['orderBy'] = { [filter['orderBy']]: filter['orderDirection'] }
        } else {
          query['orderBy'] = { [filter['orderBy']]: 'asc' }
        }

      }

      if ('department' in filter) {
        query['where'] = { department: { name: filter['department'] } }
      }

      if ('position' in filter) {
        query['where'] = { position: { name: filter['position'] } }
      }

    }

    const prismaQuery = this.prisma.employee.findMany(query)

    const [results, count] = await this.prisma.$transaction([
      prismaQuery,
      this.prisma.employee.count({ where: query.where}),
    ]);

    const employees = results.map( employee => {
      return new EmployeeEntity(employee)
    })

    return this.paginationService.paginate(count, take, employees)
  }

  async findOne(employeeWhereUniqueInput: Prisma.EmployeeWhereUniqueInput): Promise<(Employee & {department: Department} & {position: Position})| null> {
    return this.prisma.employee.findUnique({
      where: employeeWhereUniqueInput,
      include: {
        department: true,
        position: true
      }
    })
  }

  async update(where: Prisma.EmployeeWhereUniqueInput, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    return this.prisma.employee.update({
      where: where,
      data: updateEmployeeDto
    })
  }

  async remove(where: Prisma.EmployeeWhereUniqueInput): Promise<Employee> {
    return this.prisma.employee.delete({
      where: where
    })
  }
}
