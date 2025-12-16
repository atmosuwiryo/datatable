import { HttpClient } from '@angular/common/http';
import { inject,Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  private http = inject(HttpClient);


  getDatatable() {
    return this.http.get('/api/employees/');
  }
}
