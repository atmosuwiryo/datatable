import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridModule, ClrDatagridStateInterface } from '@clr/angular';

import { DepartmentType } from '../../models/department.model';


@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, ClrDatagridModule],
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentListComponent {
  @Input() departments: DepartmentType[] = [];
  @Input() total = 0;
  @Input() loading = true;

  @Output() refresh = new EventEmitter<ClrDatagridStateInterface>();
  @Output() edit = new EventEmitter<DepartmentType>();
  @Output() delete = new EventEmitter<DepartmentType>();

  onEdit(department: DepartmentType) {
    this.edit.emit(department);
  }

  onDelete(department: DepartmentType) {
    this.delete.emit(department);
  }
}
