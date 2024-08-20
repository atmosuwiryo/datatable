/* eslint-disable max-lines-per-function */
import { Test, TestingModule } from '@nestjs/testing';

import { PaginationService } from '../services/pagination.service';
import { PrismaService } from '../services/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './entities/employee.entity';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let prisma: PrismaService;
  let paginationService: PaginationService<EmployeeEntity>;
  const now = new Date();
  const employee = {
    id: '1',
    name: 'John Doe',
    departmentId: '1',
    positionId: '1',
    dateOfHire: now,
    createdAt: now,
    updatedAt: now,
    department: {
      id: '1',
      name: 'Engineering',
      createdAt: now,
      updatedAt: now,
    },
    position: {
      id: '1',
      name: 'Software Engineer',
      createdAt: now,
      updatedAt: now,
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: PrismaService,
          useValue: {
            employee: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
        {
          provide: PaginationService,
          useValue: {
            paginate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    prisma = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService<EmployeeEntity>>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an employee', async () => {
      const createEmployeeDto: CreateEmployeeDto = { name: 'John Doe', departmentId: '1', positionId: '1', dateOfHire: now };
      const createdEmployee = employee;

      jest.spyOn(prisma.employee, 'create').mockResolvedValue(createdEmployee);

      const result = await service.create(createEmployeeDto);

      expect(prisma.employee.create).toHaveBeenCalledWith({ data: createEmployeeDto });
      expect(result).toEqual(createdEmployee);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of employees', async () => {
      const page = 1;
      const take = 10;
      const filter = { search: 'Engineering', orderBy: 'department', orderDirection: 'asc' };
      const count = 1;

      const employees = [employee];
      const employeeEntities = employees.map((employee) => new EmployeeEntity(employee));
      const employeePagination = {
        results: employeeEntities,
        count,
        previous: null,
        next: null
      };

      jest.spyOn(prisma.employee, 'findMany').mockResolvedValue(employeeEntities);
      jest.spyOn(prisma.employee, 'count').mockResolvedValue(count);
      jest.spyOn(prisma, '$transaction').mockResolvedValue([employeeEntities, count]);
      jest.spyOn(paginationService, 'paginate').mockResolvedValue(employeePagination);

      const query = {
        skip: (page - 1) * take,
        take,
        include: {
          department: true,
          position: true,
        },
        where: {
          OR: [
            { name: { contains: 'Engineering', mode: 'insensitive' } },
            { department: { name: { contains: 'Engineering', mode: 'insensitive' } } },
            { position: { name: { contains: 'Engineering', mode: 'insensitive' } } },
          ],
        },
        orderBy: { department: { name: 'asc' } },
      };

      const result = await service.findAll(page, take, filter);

      expect(prisma.employee.findMany).toHaveBeenCalledWith(query);
      expect(prisma.employee.count).toHaveBeenCalledWith({ where: query.where });
      expect(result).toEqual(employeePagination);
    });
  });

  describe('findOne', () => {
    it('should return a single employee by unique input', async () => {
      const employeeWhereUniqueInput = { id: '1' };

      jest.spyOn(prisma.employee, 'findUnique').mockResolvedValue(employee);

      const result = await service.findOne(employeeWhereUniqueInput);

      expect(prisma.employee.findUnique).toHaveBeenCalledWith({
        where: employeeWhereUniqueInput,
        include: {
          department: true,
          position: true,
        },
      });
      expect(result).toEqual(new EmployeeEntity(employee));
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      const employeeWhereUniqueInput = { id: '1' };
      const updateEmployeeDto: UpdateEmployeeDto = { name: 'John Updated' };
      const updatedEmployee = employee;

      jest.spyOn(prisma.employee, 'update').mockResolvedValue(updatedEmployee);

      const result = await service.update(employeeWhereUniqueInput, updateEmployeeDto);

      expect(prisma.employee.update).toHaveBeenCalledWith({
        where: employeeWhereUniqueInput,
        data: updateEmployeeDto,
        include: {
          department: true,
          position: true,
        },
      });
      expect(result).toEqual(new EmployeeEntity(updatedEmployee));
    });
  });

  describe('remove', () => {
    it('should remove an employee', async () => {
      const employeeWhereUniqueInput = { id: '1' };
      const removedEmployee = employee;

      jest.spyOn(prisma.employee, 'delete').mockResolvedValue(removedEmployee);

      const result = await service.remove(employeeWhereUniqueInput);

      expect(prisma.employee.delete).toHaveBeenCalledWith({
        where: employeeWhereUniqueInput,
        include: {
          department: true,
          position: true,
        },
      });
      expect(result).toEqual(new EmployeeEntity(removedEmployee));
    });
  });
});
