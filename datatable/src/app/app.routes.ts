import { Route } from '@angular/router';
// import { EmployeeComponent } from './components/employee/employee.component';
// import { DepartmentComponent } from './components/department/department.component';
// import { PositionComponent } from './components/position/position.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee', loadComponent: () => import('./features/employee/employee.component').then(m => m.EmployeeComponent) },
  { path: 'department', loadComponent: () => import('./features/department/department.component').then(m => m.DepartmentComponent) },
  { path: 'position', loadComponent: () => import('./features/position/position.component').then(m => m.PositionComponent) }
];
