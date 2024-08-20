import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ClrDatagridModule, ClrDatagridStateInterface } from '@clr/angular';
import { debounce, firstValueFrom, interval,Subject } from 'rxjs';

import { DepartmentService } from '../../services/department.service';
import { DepartmentPagination } from './department-pagination.interface';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, ClrDatagridModule],
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
  page = 1;
  take = 10;

  departmentsPagination$ = signal(this.departmentsPaginationInitialValue);
  departments$ = computed(() => this.departmentsPagination$().results);
  count$ = computed(() => this.departmentsPagination$().count);
  lastPage$ = computed(() => Math.ceil(this.departmentsPagination$().count / this.take));

  loading = true;
  previousState?: ClrDatagridStateInterface;
  debouncer = new Subject<ClrDatagridStateInterface>();

  constructor() {
    // effect(() => {
    //   console.log('effect: departmentsPagination$', this.departmentsPagination$());
    //   console.log('effect: departments$', this.departments$());
    //   console.log('effect: count$', this.count$());
    // })

    this.debouncer.asObservable().pipe(debounce(() => interval(500))).subscribe(state => {
      const sort = state.sort ? state.sort.by as string : 'name';
      const reverse = state.sort ? state.sort.reverse : false;
      this.getDepartments(this.page, this.take, state.filters, sort, reverse);
    });
  }

  async getDepartments(
    page: number,
    take: number,
    filters?: unknown[],
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

  pageChanged(page: number) {
    this.selectedDepartments = [];
  }

  refresh(state: ClrDatagridStateInterface) {
    // Check is filter changed by comparing 2 filters arrays,
    // here we use JSON.stringify to compare 2 objects
    const isFilterChanged = JSON.stringify(state.filters) !== JSON.stringify(this.previousState?.filters) ? true:false;

    if (state.page?.current) {
      this.page = state.page.current;
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

    // Debounce only for filter changes
    if (isFilterChanged) {
      this.debouncer.next(state);
    } else {
      const sort = state.sort ? state.sort.by as string : 'name';
      const reverse = state.sort ? state.sort.reverse : false;

      this.getDepartments(this.page, this.take, state.filters, sort, reverse);
    }
  }

  onEdit(department: any) {
    console.log(department);
  }

  onDelete(department: any) {
    console.log(department);
  }
}
