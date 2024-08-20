import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { PositionModule } from './position/position.module';
import { PrismaService } from './services/prisma.service';
import { ServicesModule } from './services/services.module';

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
