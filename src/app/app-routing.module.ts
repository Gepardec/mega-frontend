import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {configuration} from './domains/shared/util-constant/configuration';
import {LoginComponent} from './domains/shared/ui-common/login/login.component';
import {LoginGuard} from './domains/shared/util-guard/login/login.guard';
import {RolesGuard} from './domains/shared/util-guard/roles/roles.guard';
import {ErrorComponent} from './domains/shared/ui-common/error/error.component';
import {FeatureMonthlyReportComponent} from './domains/monthly-report/feature-monthly-report/feature-monthly-report.component';
import {FeatureOfficeManagementComponent} from './domains/office-management/feature-office-management/feature-office-management.component';
import {FeatureProjectManagementComponent} from './domains/project-management/feature-project-management/feature-project-management.component';
import {Role} from './domains/shared/data-model/Role';

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
