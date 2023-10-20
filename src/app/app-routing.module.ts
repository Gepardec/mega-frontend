import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {configuration} from '@mega/shared/util-constant';
import {LoginComponent} from '@mega/shared/ui-common';
import {LoginGuard} from '@mega/shared/util-guard';
import {RolesGuard} from '@mega/shared/util-guard';
import {ErrorComponent} from '@mega/shared/ui-common';
import {FeatureMonthlyReportComponent} from './domains/monthly-report/feature-monthly-report/feature-monthly-report.component';
import {FeatureOfficeManagementComponent} from './domains/office-management/feature-office-management/feature-office-management.component';
import {FeatureProjectManagementComponent} from '@mega/project-management/feature-project-management';
import {Role} from '@mega/shared/data-model';

export const routes: Routes = [
  {
    path: configuration.PAGE_URLS.MONTHLY_REPORT,
    component: FeatureMonthlyReportComponent,
    data: {
      role: Role.EMPLOYEE
    },
    canActivate: [LoginGuard, RolesGuard]
  },
  {
    path: configuration.PAGE_URLS.OFFICE_MANAGEMENT,
    component: FeatureOfficeManagementComponent,
    data: {
      role: Role.OFFICE_MANAGEMENT
    },
    canActivate: [LoginGuard, RolesGuard]
  },
  {
    path: configuration.PAGE_URLS.PROJECT_MANAGEMENT,
    component: FeatureProjectManagementComponent,
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
