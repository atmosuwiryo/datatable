/* eslint-disable max-lines-per-function */
import { Test, TestingModule } from '@nestjs/testing';
import { FastifyRequest } from 'fastify';

import { PaginationService } from './pagination.service';

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

describe('PaginationService', () => {
  let service: PaginationService<any>;
  let mockRequest: Writable<Partial<FastifyRequest>>;

  beforeEach(async () => {
    mockRequest = {
      protocol: 'http',
      hostname: 'localhost',
      originalUrl: '/api/items?page=1&take=10',
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaginationService,
        {
          provide: 'REQUEST',
          useValue: mockRequest,
        },
      ],
    }).compile();

    service = module.get<PaginationService<any>>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('paginate', () => {
    it('should return correct pagination structure', async () => {
      const results = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
      const count = 20;
      const take = 10;

      const paginationResult = await service.paginate(count, take, results);

      expect(paginationResult).toEqual({
        count: 20,
        next: 'http://localhost/api/items?page=2&take=10',
        previous: null,
        results,
      });
    });

    it('should return null for next when on the last page', async () => {
      const results = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
      const count = 20;
      const take = 10;

      // Simulate being on the last page
      mockRequest.originalUrl = '/api/items?page=2&take=10';

      const paginationResult = await service.paginate(count, take, results);

      expect(paginationResult).toEqual({
        count: 20,
        next: null,
        previous: 'http://localhost/api/items?page=1&take=10',
        results,
      });
    });

    it('should return null for previous when on the first page', async () => {
      const results = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
      const count = 20;
      const take = 10;

      const paginationResult = await service.paginate(count, take, results);

      expect(paginationResult.previous).toBeNull();
    });

    it('should handle cases with no page in query string', async () => {
      const results = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
      const count = 20;
      const take = 10;

      // Simulate no page parameter
      mockRequest.originalUrl = '/api/items?take=10';

      const paginationResult = await service.paginate(count, take, results);

      expect(paginationResult).toEqual({
        count: 20,
        next: 'http://localhost/api/items?take=10&page=2',
        previous: null,
        results,
      });
    });
  });
});
