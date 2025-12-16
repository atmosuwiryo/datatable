import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { EmployeePagination } from '../../models/employee-pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private httpClient = inject(HttpClient);


  getEmployee(
    page: number,
    take: number,
    sort = 'name',
    reverse = false,
    filters?: unknown[]
  ) {
    let url = `/api/employees?page=${page}`
      + `&take=${take}`
      + `&orderBy=${sort}`
      + `&orderDirection=${reverse ? 'desc' : 'asc'}`;
    if (filters) {
      (filters as [{ property: string, value: string }]).forEach((filter) => {
        if (filter.property === 'department') {
          url += `&department=${filter.value}`;
        } else if (filter.property === 'position') {
          url += `&position=${filter.value}`;
        } else {
          url += `&name=${filter.value}`;
        }
      });
    }
    return this.httpClient.get<EmployeePagination>(url);
  }
}
