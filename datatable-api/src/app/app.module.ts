import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { ServicesModule } from './services/services.module';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EmployeeModule,
    ServicesModule,
    DepartmentModule,
    PositionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
