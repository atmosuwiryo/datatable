import { Global, Module } from '@nestjs/common';

import { PaginationService } from './pagination.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, PaginationService],
  exports: [PrismaService, PaginationService],
})
export class ServicesModule {}
