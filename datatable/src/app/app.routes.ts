import { Route } from '@angular/router';
// import { EmployeeComponent } from './components/employee/employee.component';
// import { DepartmentComponent } from './components/department/department.component';
// import { PositionComponent } from './components/position/position.component';

export const appRoutes: Route[] = [
  {path: '', redirectTo: 'employee', pathMatch: 'full'},
  // {path: 'employee', component: EmployeeComponent},
  {path: 'employee', loadComponent: () => import('./components/employee/employee.component').then(m => m.EmployeeComponent)},
  // {path: 'department', component: DepartmentComponent},
  {path: 'department', loadComponent: () => import('./components/department/department.component').then(m => m.DepartmentComponent)},
  // {path: 'position', component: PositionComponent}
  {path: 'position', loadComponent: () => import('./components/position/position.component').then(m => m.PositionComponent)}
];
