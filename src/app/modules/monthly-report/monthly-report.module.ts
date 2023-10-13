import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonthlyReportComponent} from './components/monthly-report.component';
import {AngularMaterialModule} from '../material/material-module';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {TimeCheckComponent} from './components/time-check/time-check.component';
import {JourneyCheckComponent} from './components/journey-check/journey-check.component';
import {EmployeeCheckComponent} from './components/employee-check/employee-check.component';
import {PmProgressComponent} from '../shared/components/pm-progress/pm-progress.component';
import {GeneralInfoComponent} from './components/general-info/general-info.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {InformationTopBarComponent} from './components/information-top-bar/information-top-bar.component';
import {
  EmployeeCheckConfirmCommentDialogComponent
} from './components/employee-check-confirm-comment-dialog/employee-check-confirm-comment-dialog.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    TranslateModule.forRoot(),
    SharedModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    MonthlyReportComponent,
    TimeCheckComponent,
    JourneyCheckComponent,
    EmployeeCheckComponent,
    PmProgressComponent,
    GeneralInfoComponent,
    InformationTopBarComponent,
    EmployeeCheckConfirmCommentDialogComponent
  ],
  exports: [
    TranslateModule
  ]
})
export class MonthlyReportModule {
}
