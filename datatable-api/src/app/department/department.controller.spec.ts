import { Test, TestingModule } from '@nestjs/testing';

import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { OrderDirection, PaginationRequestDto } from './dto/pagination-request.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentEntity } from './entities/department.entity';

describe('DepartmentController', () => {
  let controller: DepartmentController;
  let service: DepartmentService;
  const now = new Date();
  const department = {
    id: '1',
    name: 'Engineering',
    createdAt: now,
    updatedAt: now
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        {
          provide: DepartmentService,
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

    controller = module.get<DepartmentController>(DepartmentController);
    service = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a department', async () => {
      const createDepartmentDto: CreateDepartmentDto = { name: 'Software Engineer' };
      const createdDepartment = new DepartmentEntity(department);

      jest.spyOn(service, 'create').mockResolvedValue(createdDepartment);

      const result = await controller.create(createDepartmentDto);

      expect(service.create).toHaveBeenCalledWith(createDepartmentDto);
      expect(result).toEqual(createdDepartment);
    });
  });

  describe('findAll', () => {
    it('should return a list of departments', async () => {
      const paginationRequestDto: PaginationRequestDto = { page: 1, take: 10, search: 'Engineering', orderDirection: OrderDirection.ASC };
      const departmentEntities = [new DepartmentEntity(department)];
      const paginatedResult = {
        results: departmentEntities,
        count: 1,
        previous: null,
        next: null
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(paginatedResult);

      const result = await controller.findAll(paginationRequestDto);

      expect(service.findAll).toHaveBeenCalledWith(1, 10, { search: 'Engineering', orderDirection: 'asc' });
      expect(result).toEqual(paginatedResult);
    });
  });

  describe('findOne', () => {
    it('should return a department by id', async () => {
      const departmentEntity = new DepartmentEntity(department);

      jest.spyOn(service, 'findOne').mockResolvedValue(departmentEntity);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(departmentEntity);
    });
  });

  describe('update', () => {
    it('should update a department', async () => {
      const updateDepartmentDto: UpdateDepartmentDto = { name: 'HR Updated' };
      const updatedDepartment = new DepartmentEntity(department);

      jest.spyOn(service, 'update').mockResolvedValue(updatedDepartment);

      const result = await controller.update('1', updateDepartmentDto);

      expect(service.update).toHaveBeenCalledWith({ id: '1' }, updateDepartmentDto);
      expect(result).toEqual(updatedDepartment);
    });
  });

  describe('remove', () => {
    it('should remove a department', async () => {
      const removedDepartment = new DepartmentEntity(department);

      jest.spyOn(service, 'remove').mockResolvedValue(removedDepartment);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(removedDepartment);
    });
  });
});
