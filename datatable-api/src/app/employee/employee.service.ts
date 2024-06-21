import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../services/prisma.service';
import { Department, Employee, Position, Prisma } from '@prisma/client';

@Injectable()
export class EmployeeService {

  constructor(private prisma: PrismaService){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: createEmployeeDto
    })
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeeWhereUniqueInput,
    where?: Prisma.EmployeeWhereInput,
    orderBy?: Prisma.EmployeeOrderByWithRelationInput
  }): Promise<Array<Employee & {department: Department} & {position: Position}>> {
    const {skip, take, cursor, where, orderBy} = params;
    return this.prisma.employee.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        department: true,
        position: true
      }
    })
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
