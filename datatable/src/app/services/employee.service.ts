import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeePagination } from '../components/employee-pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getEmployee(page: number, take: number, sort = 'name', reverse = false) {
    return this.httpClient.get<EmployeePagination>(
      `/api/employees?page=${page}
&take=${take}
&orderBy=${sort}
&orderDirection=${reverse? 'desc': 'asc'}`
    );
  }
}
