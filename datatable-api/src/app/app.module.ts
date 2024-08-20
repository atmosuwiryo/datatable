import { Module } from '@nestjs/common';

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
  providers: [PrismaService],
})
export class AppModule {}
