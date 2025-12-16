import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridModule, ClrDatagridStateInterface } from '@clr/angular';

import { PositionType } from '../../models/position.model';


@Component({
  selector: 'app-position-list',
  standalone: true,
  imports: [CommonModule, ClrDatagridModule],
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionListComponent {
  @Input() positions: PositionType[] = [];
  @Input() total = 0;
  @Input() loading = true;

  @Output() refresh = new EventEmitter<ClrDatagridStateInterface>();
  @Output() edit = new EventEmitter<PositionType>();
  @Output() delete = new EventEmitter<PositionType>();

  onEdit(position: PositionType) {
    this.edit.emit(position);
  }

  onDelete(position: PositionType) {
    this.delete.emit(position);
  }
}
