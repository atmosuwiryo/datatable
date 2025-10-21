import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { appRoutes } from './app.routes';
import { DepartmentService } from './core/services/department.service';
import { EmployeeService } from './core/services/employee.service';
import { PositionService } from './core/services/position.service';
import { DatatableService } from './datatable.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    DepartmentService,
    EmployeeService,
    PositionService,
    DatatableService
  ],
};
