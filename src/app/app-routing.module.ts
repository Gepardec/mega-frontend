import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {configuration} from './domains/shared/constants/configuration';
import {LoginComponent} from './domains/shared/components/login/login.component';
import {LoginGuard} from './domains/shared/guards/login.guard';
import {RolesGuard} from './domains/shared/guards/roles.guard';
import {ErrorComponent} from './domains/shared/components/error/error.component';
import {MonthlyReportComponent} from './domains/monthly-report/components/monthly-report.component';
import {OfficeManagementComponent} from './domains/office-management/components/office-management/office-management.component';
import {ProjectManagementComponent} from './domains/project-management/components/project-management.component';
import {Role} from './domains/shared/models/Role';

export const routes: Routes = [
  {
    path: configuration.PAGE_URLS.MONTHLY_REPORT,
    component: MonthlyReportComponent,
    data: {
      role: Role.EMPLOYEE
    },
    canActivate: [LoginGuard, RolesGuard]
  },
  {
    path: configuration.PAGE_URLS.OFFICE_MANAGEMENT,
    component: OfficeManagementComponent,
    data: {
      role: Role.OFFICE_MANAGEMENT
    },
    canActivate: [LoginGuard, RolesGuard]
  },
  {
    path: configuration.PAGE_URLS.PROJECT_MANAGEMENT,
    component: ProjectManagementComponent,
    data: {
      role: Role.PROJECT_LEAD
    },
    canActivate: [LoginGuard, RolesGuard]
  },
  {
    path: configuration.PAGE_URLS.LOGIN,
    component: LoginComponent
  },
  {
    path: configuration.PAGE_URLS.ERROR,
    component: ErrorComponent
  },
  {
    path: '',
    redirectTo: configuration.PAGE_URLS.LOGIN,
    pathMatch: 'full'
  },
  {
    path: '#',
    redirectTo: configuration.PAGE_URLS.LOGIN
  },
  {
    path: '**',
    redirectTo: configuration.PAGE_URLS.LOGIN
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
