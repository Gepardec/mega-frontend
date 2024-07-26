import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {Moment} from 'moment';
import {OfficeManagementService} from '@mega/office-management/data-service';
import {Subscription, zip} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TranslateModule} from '@ngx-translate/core';
import {EmployeeCardComponent} from './employee-card/employee-card.component';
import {ProjectOverviewCardComponent} from './project-overview-card/project-overview-card.component';
import {ProjectsWithoutLeadsCardComponent} from './projects-without-leads-card/projects-without-leads-card.component';
import {EnterpriseCardComponent} from './enterprise-card/enterprise-card.component';
import {DatepickerMonthYearComponent} from '@mega/shared/ui-common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {ErrorService} from '@mega/shared/data-service';
import {NgIf} from '@angular/common';
import {
  ThirdPartyServiceErrorComponent
} from '../../project-management/ui-common/third-party-service-error/third-party-service-error.component';

const moment = _moment;

@Component({
  selector: 'app-office-management',
  templateUrl: './feature-office-management.component.html',
  styleUrls: ['./feature-office-management.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    DatepickerMonthYearComponent,
    EnterpriseCardComponent,
    ProjectsWithoutLeadsCardComponent,
    ProjectOverviewCardComponent,
    EmployeeCardComponent,
    TranslateModule,
    MatBottomSheetModule,
    ThirdPartyServiceErrorComponent,
    NgIf,
  ]
})
export class FeatureOfficeManagementComponent implements OnInit, OnDestroy {

  selectedYear: number;
  selectedMonth: number;
  dateSelectionSub: Subscription;
  maxMonthDate: number = 1;

  constructor(private omService: OfficeManagementService,
              public errorService: ErrorService
  ) {
  }

  get date() {
    return moment()
      .year(this.selectedYear)
      .month(this.selectedMonth)
      .date(1)
      .startOf('day');
  }

  ngOnInit(): void {
    this.dateSelectionSub = zip(this.omService.selectedYear, this.omService.selectedMonth)
      .pipe(
        tap(value => {
          this.selectedYear = value[0];
          this.selectedMonth = value[1];
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.omService.selectedYear.next(moment().subtract(1, 'month').year());
    this.omService.selectedMonth.next(moment().subtract(1, 'month').month() + 1);

    this.dateSelectionSub?.unsubscribe();
  }

  dateChanged(date: Moment) {
    this.omService.selectedYear.next(moment(date).year());
    this.omService.selectedMonth.next(moment(date).month() + 1);
  }
}
