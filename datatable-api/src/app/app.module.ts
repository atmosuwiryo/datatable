import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [ConfigModule.forRoot(), EmployeeModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
