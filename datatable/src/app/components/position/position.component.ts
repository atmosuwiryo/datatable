import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionService } from '../../services/position.service';
import { PositionPagination } from './position-pagination.interface';
import { Subject, debounce, firstValueFrom, interval } from 'rxjs';
import { ClrDatagridModule, ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [CommonModule, ClrDatagridModule],
  templateUrl: './position.component.html',
  styleUrl: './position.component.css',
})
export class PositionComponent {
  private positionService = inject(PositionService);

  positionsPaginationInitialValue: PositionPagination = {
    count: 0,
    next: null,
    previous: null,
    results: []
  };

  selectedPositions = [];
  page = 1;
  take = 10;

  positionsPagination$ = signal(this.positionsPaginationInitialValue)
  positions$ = computed(() => this.positionsPagination$().results);
  count$ = computed(() => this.positionsPagination$().count);
  lastPage$ = computed(() => Math.ceil(this.positionsPagination$().count / this.take))

  loading = true;
  previousState?: ClrDatagridStateInterface;
  debouncer = new Subject<ClrDatagridStateInterface>();

  constructor() {
    // effect(() => {
    //   console.log('effect: positionsPagination$', this.positionsPagination$());
    //   console.log('effect: positions$', this.positions$());
    //   console.log('effect: count$', this.count$());
    // })

    this.debouncer.asObservable().pipe(debounce(() => interval(500))).subscribe(state => {
      const sort = state.sort ? state.sort.by as string : 'name';
      const reverse = state.sort ? state.sort.reverse : false;
      this.getPositions(this.page, this.take, state.filters, sort, reverse);
    });

  }

  async getPositions(
    page: number,
    take: number,
    filters?: unknown[],
    sort = 'name',
    reverse = false
  ): Promise<void>{
    this.loading = true;
    const positionsPagination$ = await firstValueFrom(
        this.positionService.getPosition(page, take, sort, reverse, filters)
    )
    this.loading = false;
    this.positionsPagination$.set(positionsPagination$);
  }

  pageChanged(page: number) {
    // Reset selections on page change
    this.selectedPositions = []
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

      this.getPositions(this.page, this.take, state.filters, sort, reverse);
    }
  }


  onEdit(position: any) {
    console.log(position)
  }

  onDelete(position: any) {
    console.log(position)
  }
}
