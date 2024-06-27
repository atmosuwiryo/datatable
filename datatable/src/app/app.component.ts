import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EmployeeComponent } from './components/employee.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, vmBugIcon, cogIcon } from '@cds/core/icon';

ClarityIcons.addIcons(vmBugIcon, cogIcon);

@Component({
  standalone: true,
  imports: [RouterModule, ClarityModule, EmployeeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'datatable';
}
