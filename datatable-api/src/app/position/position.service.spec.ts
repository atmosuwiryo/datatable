import { Test, TestingModule } from '@nestjs/testing';

import { PaginationService } from '../services/pagination.service';
import { PrismaService } from '../services/prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionEntity } from './entities/position.entity';
import { PositionService } from './position.service';

describe('PositionService', () => {
  let service: PositionService;
  let prisma: PrismaService;
  let paginationService: PaginationService<PositionEntity>;
  const now = new Date();
  const position = { id: '1', name: 'Developer', createdAt: now, updatedAt: now };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PositionService,
        {
          provide: PrismaService,
          useValue: {
            position: {
              create: jest.fn(),
              findMany: jest.fn(),
              count: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
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

    service = module.get<PositionService>(PositionService);
    prisma = module.get<PrismaService>(PrismaService);
    paginationService = module.get<PaginationService<PositionEntity>>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a position', async () => {
      const createPositionDto: CreatePositionDto = { name: 'Developer' };
      const createdPosition = position;

      jest.spyOn(prisma.position, 'create').mockResolvedValue(createdPosition);

      const result = await service.create(createPositionDto);

      expect(prisma.position.create).toHaveBeenCalledWith({ data: createPositionDto });
      expect(result).toEqual(createdPosition);
    });
  });

  describe('findAll', () => {
    it('should return a list of positions with pagination', async () => {
      const page = 1;
      const take = 10;
      const filter = { search: 'Software Engineer', orderDirection: 'asc' };
      const count = 1;

      const positions = [position];
      const positionEntities = positions.map((position) => new PositionEntity(position));
      const positionPagination = {
        results: positionEntities,
        count,
        previous: null,
        next: null,
      };

      jest.spyOn(prisma.position, 'findMany').mockResolvedValue(positions);
      jest.spyOn(prisma.position, 'count').mockResolvedValue(count);
      jest.spyOn(prisma, '$transaction').mockResolvedValue([positions, count]);
      jest.spyOn(paginationService, 'paginate').mockResolvedValue(positionPagination);

      const query = {
        skip: (page - 1) * take,
        take,
        where: {
          OR: [{ name: { contains: filter.search, mode: 'insensitive' } }],
        },
        orderBy: { name: filter.orderDirection },
      };

      const result = await service.findAll(page, take, filter);

      expect(prisma.position.findMany).toHaveBeenCalledWith(query);
      expect(prisma.position.count).toHaveBeenCalledWith({ where: query.where });
      expect(result).toEqual(positionPagination);
    });
  });

  describe('findOne', () => {
    it('should return a single position by id', async () => {
      const positionWhereUniqueInput = { id: '1' };

      jest.spyOn(prisma.position, 'findUniqueOrThrow').mockResolvedValue(position);

      const result = await service.findOne(positionWhereUniqueInput);

      expect(prisma.position.findUniqueOrThrow).toHaveBeenCalledWith({
        where: positionWhereUniqueInput
      });
      expect(result).toEqual(new PositionEntity(position));
    });
  });

  describe('update', () => {
    it('should update a position by id', async () => {
      const positionWhereUniqueInput = { id: '1' };
      const updatePositionDto: UpdatePositionDto = { name: 'Senior Developer' };
      const updatedPosition = position;

      jest.spyOn(prisma.position, 'update').mockResolvedValue(updatedPosition);

      const result = await service.update(positionWhereUniqueInput, updatePositionDto);

      expect(prisma.position.update).toHaveBeenCalledWith({
        where: positionWhereUniqueInput,
        data: updatePositionDto
      });
      expect(result).toEqual(new PositionEntity(updatedPosition));
    });
  });

  describe('remove', () => {
    it('should delete a position by id', async () => {
      const positionWhereUniqueInput = { id: '1' };
      const removedPosition = position;

      jest.spyOn(prisma.position, 'delete').mockResolvedValue(removedPosition);

      const result = await service.remove(positionWhereUniqueInput);

      expect(prisma.position.delete).toHaveBeenCalledWith({
        where: positionWhereUniqueInput
      });
      expect(result).toEqual(new PositionEntity(removedPosition));
    });
  });
});
