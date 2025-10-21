
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridModule, ClrDatagridStateInterface } from '@clr/angular';

import { EmployeeType } from '../../models/employee.model';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, ClrDatagridModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent {
  @Input() employees: EmployeeType[] = [];
  @Input() total = 0;
  @Input() loading = true;

  @Output() refresh = new EventEmitter<ClrDatagridStateInterface>();
  @Output() edit = new EventEmitter<EmployeeType>();
  @Output() delete = new EventEmitter<EmployeeType>();

  onEdit(employee: EmployeeType) {
    this.edit.emit(employee);
  }

  onDelete(employee: EmployeeType) {
    this.delete.emit(employee);
  }
}
