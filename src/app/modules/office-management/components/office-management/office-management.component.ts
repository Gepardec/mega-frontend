import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {Moment} from 'moment';
import {OfficeManagementService} from '../../services/office-management.service';
import {Subscription, zip} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TranslateModule} from '@ngx-translate/core';
import {EmployeeCardComponent} from '../employee-card/employee-card.component';
import {ProjectOverviewCardComponent} from '../project-overview-card/project-overview-card.component';
import {ProjectsWithoutLeadsCardComponent} from '../projects-without-leads-card/projects-without-leads-card.component';
import {EnterpriseCardComponent} from '../enterprise-card/enterprise-card.component';
import {
  DatepickerMonthYearComponent
} from '../../../shared/components/datepicker-month-year/datepicker-month-year.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

const moment = _moment;

@Component({
  selector: 'app-office-management',
  templateUrl: './office-management.component.html',
  styleUrls: ['./office-management.component.scss'],
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
  ]
})
export class OfficeManagementComponent implements OnInit, OnDestroy {

  selectedYear: number;
  selectedMonth: number;
  dateSelectionSub: Subscription;
  maxMonthDate: number = 1;

  constructor(private omService: OfficeManagementService) {
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
