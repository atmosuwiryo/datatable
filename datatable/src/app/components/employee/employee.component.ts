import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { EmployeePagination } from './employee-pagination.interface';
import { ClrDatagridModule, ClrDatagridStateInterface } from '@clr/angular';
import { Subject, debounce, firstValueFrom, interval } from 'rxjs';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ClrDatagridModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers: [EmployeeService]
})
export class EmployeeComponent {
  private employeeService = inject(EmployeeService);

  employeesPaginationInitialValue: EmployeePagination = {
    count: 0,
    next: null,
    previous: null,
    results: []
  };

  selectedEmployees = [];
  page = 1;
  take = 10;

  employeesPagination$ = signal(this.employeesPaginationInitialValue)
  employees$ = computed(() => this.employeesPagination$().results);
  count$ = computed(() => this.employeesPagination$().count);
  lastPage$ = computed(() => Math.ceil(this.employeesPagination$().count / this.take))

  loading = true;
  previousState?: ClrDatagridStateInterface;
  debouncer = new Subject<ClrDatagridStateInterface>();

  constructor() {
    // effect(() => {
    //   console.log('effect: employeesPagination$', this.employeesPagination$());
    //   console.log('effect: employees$', this.employees$());
    //   console.log('effect: count$', this.count$());
    // })

    this.debouncer.asObservable().pipe(debounce(() => interval(500))).subscribe(state => {
      const sort = state.sort ? state.sort.by as string : 'name';
      const reverse = state.sort ? state.sort.reverse : false;
      this.getEmployees(this.page, this.take, state.filters, sort, reverse);
    });
  }

  async getEmployees(
    page: number,
    take: number,
    filters?: unknown[],
    sort = 'name',
    reverse = false
  ): Promise<void>{
    this.loading = true;
    const employeesPagination$ = await firstValueFrom(
        this.employeeService.getEmployee(page, take, sort, reverse, filters)
    )
    this.loading = false;
    this.employeesPagination$.set(employeesPagination$);
  }

  pageChanged(page: number) {
    this.selectedEmployees = []
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

      this.getEmployees(this.page, this.take, state.filters, sort, reverse);
    }
  }

  onEdit(employee: any) {
    console.log(employee)
  }

  onDelete(employee: any) {
    console.log(employee)
  }
}
