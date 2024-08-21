import { Test, TestingModule } from '@nestjs/testing';

import { CreatePositionDto } from './dto/create-position.dto';
import { PaginationRequestDto } from './dto/pagination-request.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionEntity } from './entities/position.entity';
import { PositionPagination } from './entities/position-pagination.entity';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';

describe('PositionController', () => {
  let controller: PositionController;
  let service: PositionService;
  const now = new Date();
  const position = {
    id: '1',
    name: 'Software Engineer',
    createdAt: now,
    updatedAt: now,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionController],
      providers: [
        {
          provide: PositionService,
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

    controller = module.get<PositionController>(PositionController);
    service = module.get<PositionService>(PositionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new position', async () => {
      const createPositionDto: CreatePositionDto = { name: 'Software Engineer' };
      const createdPosition = new PositionEntity(position);

      jest.spyOn(service, 'create').mockResolvedValue(createdPosition);

      const result = await controller.create(createPositionDto);

      expect(service.create).toHaveBeenCalledWith(createPositionDto);
      expect(result).toEqual(createdPosition);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of positions', async () => {
      const paginationDto: PaginationRequestDto = { page: 1, take: 10, search: 'Developer' };
      const positions = [new PositionEntity(position)];
      const positionPagination: PositionPagination = {
        results: positions,
        count: 1,
        previous: null,
        next: null
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(positionPagination);

      const result = await controller.findAll(paginationDto);

      expect(service.findAll).toHaveBeenCalledWith(1, 10, { search: 'Developer' });
      expect(result).toEqual(positionPagination);
    });
  });

  describe('findOne', () => {
    it('should return a position by id', async () => {
      const positionEntity = new PositionEntity(position);

      jest.spyOn(service, 'findOne').mockResolvedValue(positionEntity);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(positionEntity);
    });
  });

  describe('update', () => {
    it('should update a position by id', async () => {
      const updatePositionDto: UpdatePositionDto = { name: 'Senior Developer' };
      const updatedPosition = new PositionEntity(position);

      jest.spyOn(service, 'update').mockResolvedValue(updatedPosition);

      const result = await controller.update('1', updatePositionDto);

      expect(service.update).toHaveBeenCalledWith({ id: '1' }, updatePositionDto);
      expect(result).toEqual(updatedPosition);
    });
  });

  describe('remove', () => {
    it('should delete a position by id', async () => {
      const removedPosition = new PositionEntity(position);

      jest.spyOn(service, 'remove').mockResolvedValue(removedPosition);

      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(removedPosition);
    });
  });
});
