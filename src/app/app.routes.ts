import {Routes} from '@angular/router';
import {configuration} from '@mega/shared/util-constant';
import {FeatureMonthlyReportComponent} from '@mega/monthly-report/feature-monthly-report';
import {Role} from '@mega/shared/data-model';
import {loginGuard, rolesGuard} from '@mega/shared/util-guard';
import {FeatureOfficeManagementComponent} from '@mega/office-management/feature-office-management';
import {FeatureProjectManagementComponent} from '@mega/project-management/feature-project-management';
import {ErrorComponent, LoginComponent} from '@mega/shared/ui-common';

export const routes: Routes = [
  {
    path: configuration.PAGE_URLS.MONTHLY_REPORT,
    component: FeatureMonthlyReportComponent,
    data: {
      role: Role.EMPLOYEE
    },
    canActivate: [loginGuard, rolesGuard]
  },
  {
    path: configuration.PAGE_URLS.OFFICE_MANAGEMENT,
    component: FeatureOfficeManagementComponent,
    data: {
      role: Role.OFFICE_MANAGEMENT
    },
    canActivate: [loginGuard, rolesGuard]
  },
  {
    path: configuration.PAGE_URLS.PROJECT_MANAGEMENT,
    component: FeatureProjectManagementComponent,
    data: {
      role: Role.PROJECT_LEAD
    },
    canActivate: [loginGuard, rolesGuard]
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
