import { Component, Injector, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { EmployeePagination } from './employee-pagination.interface';
import { ClrDatagridModule, ClrDatagridStateInterface } from '@clr/angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ClrDatagridModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
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

  constructor() {
    effect(() => {
      console.log('effect: employeesPagination$', this.employeesPagination$());
      console.log('effect: employees$', this.employees$());
      console.log('effect: count$', this.count$());
    })
  }

  ngOnInit(): void {
    console.log('onInit');
  }

  async getEmployees(page: number, take: number, sort = 'name', reverse = false): Promise<void>{
    this.loading = true;
    const employeesPagination$ = await firstValueFrom(this.employeeService.getEmployee(page, take, sort, reverse))
    this.loading = false;
    this.employeesPagination$.set(employeesPagination$);
  }

  pageChanged(page: number) {
    console.log('pageChanged', page);
  }

  refresh(state: ClrDatagridStateInterface) {
    console.log('state', state);
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
    if (state.sort) {
      this.getEmployees(this.page, this.take, state.sort.by as string, state.sort.reverse);
    } else {
      this.getEmployees(this.page, this.take);
    }
  }

}
