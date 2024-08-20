import '@cds/core/icon/register.js';

import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityIcons, cogIcon, moonIcon,sunIcon, vmBugIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';

import { EmployeeComponent } from './components/employee/employee.component';

ClarityIcons.addIcons(vmBugIcon, cogIcon, sunIcon, moonIcon);

@Component({
  standalone: true,
  imports: [RouterModule, ClarityModule, EmployeeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'datatable';
  private document = inject(DOCUMENT);
  theme = 'light';

  darkMode() {
    this.theme = 'dark';
    this.document.body.setAttribute('cds-theme', this.theme);
  }

  lightMode() {
    this.theme = 'light';
    this.document.body.setAttribute('cds-theme', this.theme);
  }
}
