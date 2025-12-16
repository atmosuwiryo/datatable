
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { debounce, firstValueFrom, interval, Subject } from 'rxjs';

import { DepartmentService } from '../../core/services/department.service';
import { DepartmentType } from '../../models/department.model';
import { DepartmentPagination } from '../../models/department-pagination.interface';
import { DepartmentListComponent } from './department-list.component';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, DepartmentListComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent {
  private departmentService = inject(DepartmentService);

  departmentsPaginationInitialValue: DepartmentPagination = {
    count: 0,
    next: null,
    previous: null,
    results: []
  };

  selectedDepartments = [];
  take = 10;

  departmentsPagination$ = signal(this.departmentsPaginationInitialValue);
  departments$ = computed(() => this.departmentsPagination$().results);
  count$ = computed(() => this.departmentsPagination$().count);
  lastPage$ = computed(() => Math.ceil(this.departmentsPagination$().count / this.take));

  loading = true;
  previousState?: ClrDatagridStateInterface;
  debouncer = new Subject<ClrDatagridStateInterface>();

  constructor() {
    this.debouncer.asObservable().pipe(debounce(() => interval(500))).subscribe(state => {
      const sort = state.sort ? state.sort.by as string : 'name';
      const reverse = state.sort ? state.sort.reverse : false;
      this.getDepartments(1, this.take, state.filters, sort, reverse);
    });
  }

  async getDepartments(
    page: number,
    take: number,
    filters?: { property: string; value: string }[],
    sort = 'name',
    reverse = false
  ): Promise<void> {
    this.loading = true;
    const departmentsPagination$ = await firstValueFrom(
      this.departmentService.getDepartment(page, take, sort, reverse, filters)
    );
    this.loading = false;
    this.departmentsPagination$.set(departmentsPagination$);
  }

  refresh(state: ClrDatagridStateInterface) {
    const isFilterChanged = JSON.stringify(state.filters) !== JSON.stringify(this.previousState?.filters) ? true : false;

    let page = 1;
    if (state.page?.current) {
      page = state.page.current;
    }
    if (state.page?.size) {
      this.take = state.page.size;
    }
    const filters: { [prop: string]: any[] } = {};
    if (state.filters) {
      for (const filter of state.filters) {
        const { property, value } = <{ property: string; value: string }>filter;
        filters[property] = [value];
      }
    }

    this.previousState = state;

    if (isFilterChanged) {
      this.debouncer.next(state);
    } else {
      const sort = state.sort ? state.sort.by as string : 'name';
      const reverse = state.sort ? state.sort.reverse : false;

      this.getDepartments(page, this.take, state.filters, sort, reverse);
    }
  }

  onEdit(department: DepartmentType) {
    console.log(department);
  }

  onDelete(department: DepartmentType) {
    console.log(department);
  }
}
