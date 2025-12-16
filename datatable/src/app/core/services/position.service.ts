import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { PositionPagination } from '../../models/position-pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private httpClient = inject(HttpClient);


  getPosition(
    page: number,
    take: number,
    sort = 'name',
    reverse = false,
    filters?: unknown[]
  ) {
    let url = `/api/positions?page=${page}`
      + `&take=${take}`
      + `&orderBy=${sort}`
      + `&orderDirection=${reverse ? 'desc' : 'asc'}`;
    if (filters) {
      (filters as [{ property: string, value: string }]).forEach((filter) => {
        url += `&search=${filter.value}`;
      });
    }
    return this.httpClient.get<PositionPagination>(url);
  }
}
