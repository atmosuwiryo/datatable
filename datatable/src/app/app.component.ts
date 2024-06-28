import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { EmployeeComponent } from './components/employee.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, vmBugIcon, cogIcon, sunIcon, moonIcon } from '@cds/core/icon';
import { DOCUMENT } from '@angular/common';

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
  private document = inject(DOCUMENT)
  theme = 'light'

  darkMode() {
    this.theme = 'dark';
    this.document.body.setAttribute('cds-theme', this.theme)
  }

  lightMode() {
    this.theme = 'light';
    this.document.body.setAttribute('cds-theme', this.theme)
  }
}
