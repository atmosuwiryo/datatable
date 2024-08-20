import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DepartmentPagination } from '../components/department/department-pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }

  getDepartment(
    page: number,
    take: number,
    sort = 'name',
    reverse = false,
    filters?: unknown[]
  ) {
    let url =  `/api/departments?page=${page}`
      + `&take=${take}`
      + `&orderBy=${sort}`
      + `&orderDirection=${reverse? 'desc': 'asc'}`;
    if (filters) {
      (filters as [{property: string, value: string}]).forEach((filter) => {
        url += `&search=${filter.value}`;
      });
    }
    return this.httpClient.get<DepartmentPagination>(url);
  }
}
