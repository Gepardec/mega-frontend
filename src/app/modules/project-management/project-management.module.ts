import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectManagementComponent} from './components/project-management.component';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {BillableTimesComponent} from './components/billable-times/billable-times.component';
import {BillableTimesFractionComponent} from './components/billable-times-fraction/billable-times-fraction.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forRoot(),
    FormsModule,
    NgxSkeletonLoaderModule,
    ProjectManagementComponent, BillableTimesComponent, BillableTimesFractionComponent
  ]
})
export class ProjectManagementModule {
}
