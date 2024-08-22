import { Test, TestingModule } from '@nestjs/testing';

import { PaginationService } from '../services/pagination.service';
import { PrismaService } from '../services/prisma.service';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentEntity } from './entities/department.entity';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let prismaService: PrismaService;
  let paginationService: PaginationService<DepartmentEntity>;
  const now = new Date();
  const department = { id: '1', name: 'HR', createdAt: now, updatedAt: now };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        {
          provide: PrismaService,
          useValue: {
            department: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUniqueOrThrow: jest.fn(),
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

    service = module.get<DepartmentService>(DepartmentService);
    prismaService = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService<DepartmentEntity>>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a department', async () => {
      const createDepartmentDto: CreateDepartmentDto = { name: 'HR' };
      const createdDepartment = department;

      jest.spyOn(prismaService.department, 'create').mockResolvedValue(createdDepartment);

      const result = await service.create(createDepartmentDto);

      expect(prismaService.department.create).toHaveBeenCalledWith({ data: createDepartmentDto });
      expect(result).toEqual(createdDepartment);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of departments', async () => {
      const page = 1;
      const take = 10;
      const filter = { search: 'Software Engineer', orderDirection: 'asc' };
      const count = 1;

      const departments = [department];
      const departmentEntities = departments.map((department) => new DepartmentEntity(department));
      const departmentPagination = {
        results: departmentEntities,
        count,
        next: null,
        previous: null,
      };

      jest.spyOn(prismaService.department, 'findMany').mockResolvedValue(departments);
      jest.spyOn(prismaService.department, 'count').mockResolvedValue(count);
      jest.spyOn(prismaService, '$transaction').mockResolvedValue([departments, count]);
      jest.spyOn(paginationService, 'paginate').mockResolvedValue(departmentPagination);

      const query = {
        skip: (page - 1) * take,
        take,
        where: {
          OR: [{ name: { contains: filter.search, mode: 'insensitive' } }],
        },
        orderBy: { name: filter.orderDirection },
      };

      const result = await service.findAll(page, take, filter);

      expect(prismaService.department.findMany).toHaveBeenCalledWith(query);
      expect(prismaService.department.count).toHaveBeenCalledWith({ where: query.where });
      expect(result).toEqual(departmentPagination);
    });
  });

  describe('findOne', () => {
    it('should return a single department entity', async () => {
      const departmentWhereUniqueInput = { id: '1' };

      jest.spyOn(prismaService.department, 'findUniqueOrThrow').mockResolvedValue(department);

      const result = await service.findOne(departmentWhereUniqueInput);

      expect(prismaService.department.findUniqueOrThrow).toHaveBeenCalledWith({
        where: departmentWhereUniqueInput,
      });
      expect(result).toEqual(new DepartmentEntity(department));
    });
  });

  describe('update', () => {
    it('should update and return a department entity', async () => {
      const departmentWhereUniqueInput = { id: '1' };
      const updateDepartmentDto: UpdateDepartmentDto = { name: 'HR Updated' };
      const updatedDepartment = department;

      jest.spyOn(prismaService.department, 'update').mockResolvedValue(updatedDepartment);

      const result = await service.update(departmentWhereUniqueInput, updateDepartmentDto);

      expect(prismaService.department.update).toHaveBeenCalledWith({
        where: departmentWhereUniqueInput,
        data: updateDepartmentDto,
      });
      expect(result).toEqual(new DepartmentEntity(updatedDepartment));
    });
  });

  describe('remove', () => {
    it('should remove and return a department entity', async () => {
      const departmentWhereUniqueInput = { id: '1' };
      const removedDepartment = department;

      jest.spyOn(prismaService.department, 'delete').mockResolvedValue(removedDepartment);

      const result = await service.remove(departmentWhereUniqueInput);

      expect(prismaService.department.delete).toHaveBeenCalledWith({
        where: departmentWhereUniqueInput,
      });
      expect(result).toEqual(new DepartmentEntity(removedDepartment));
    });
  });
});
