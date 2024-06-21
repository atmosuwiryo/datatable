import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PaginationService } from './pagination.service';

@Global()
@Module({
  providers: [PrismaService, PaginationService],
  exports: [PrismaService, PaginationService],
})
export class ServicesModule {}
