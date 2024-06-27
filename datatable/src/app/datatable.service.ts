import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor(private http: HttpClient) { }

  getDatatable() {
    return this.http.get('/api/employees/');
  }
}
