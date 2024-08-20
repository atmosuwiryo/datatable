/* eslint-disable max-lines-per-function */
import { Test, TestingModule } from '@nestjs/testing';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PaginationRequestDto } from './dto/pagination-request.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './entities/employee.entity';
import { EmployeePagination } from './entities/employee-pagination.entity';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;
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
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an employee', async () => {
      const now = new Date();
      const createEmployeeDto: CreateEmployeeDto = { name: 'John Doe', departmentId: '1', positionId: '1', dateOfHire: now };
      const createdEmployee = employee;

      jest.spyOn(service, 'create').mockResolvedValue(createdEmployee);

      const result = await controller.create(createEmployeeDto);

      expect(service.create).toHaveBeenCalledWith(createEmployeeDto);
      expect(result).toEqual(createdEmployee);
    });
  });

  describe('findAll', () => {
    it('should return a list of employees with pagination', async () => {
      const paginationRequestDto: PaginationRequestDto = { page: 1, take: 10, search: 'John' };
      const employeePagination: EmployeePagination = {
        results: [new EmployeeEntity(employee)],
        count: 1,
        previous: null,
        next: null
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(employeePagination);

      const result = await controller.findAll(paginationRequestDto);

      expect(service.findAll).toHaveBeenCalledWith(1, 10, { search: 'John' });
      expect(result).toEqual(employeePagination);
    });
  });

  describe('findOne', () => {
    it('should return a single employee by id', async () => {
      const employeeEntity = new EmployeeEntity(employee);

      jest.spyOn(service, 'findOne').mockResolvedValue(employeeEntity);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(employeeEntity);
    });
  });

  describe('update', () => {
    it('should update an employee by id', async () => {
      const updateEmployeeDto: UpdateEmployeeDto = { name: 'John Updated' };
      const updatedEmployee = new EmployeeEntity(employee);

      jest.spyOn(service, 'update').mockResolvedValue(updatedEmployee);

      const result = await controller.update('1', updateEmployeeDto);

      expect(service.update).toHaveBeenCalledWith({ id: '1' }, updateEmployeeDto);
      expect(result).toEqual(updatedEmployee);
    });
  });

  describe('remove', () => {
    it('should delete an employee by id', async () => {
      const removedEmployee = new EmployeeEntity(employee);

      jest.spyOn(service, 'remove').mockResolvedValue(removedEmployee);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(removedEmployee);
    });
  });
});
