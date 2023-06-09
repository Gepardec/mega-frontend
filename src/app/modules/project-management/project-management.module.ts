import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectManagementComponent} from './components/project-management.component';
import {AngularMaterialModule} from '../material/material-module';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {BillableTimesComponent} from './components/billable-times/billable-times.component';
import {BillableTimesFractionComponent} from './components/billable-times-fraction/billable-times-fraction.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

@NgModule({
  declarations: [ProjectManagementComponent, BillableTimesComponent, BillableTimesFractionComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    TranslateModule.forRoot(),
    FormsModule,
    NgxSkeletonLoaderModule
  ]
})
export class ProjectManagementModule {
}
