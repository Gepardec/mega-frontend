import {Component, OnInit} from '@angular/core';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {Subscription} from 'rxjs';
import {MonthlyReportService} from '@mega/monthly-report/data-service';
import {JourneyCheckComponent} from './journey-check/journey-check.component';
import {GeneralInfoComponent} from './general-info/general-info.component';
import {EmployeeCheckComponent} from './employee-check/employee-check.component';
import {TimeCheckComponent} from './time-check/time-check.component';
import {InformationTopBarComponent} from './information-top-bar/information-top-bar.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './feature-monthly-report.component.html',
  styleUrls: ['./feature-monthly-report.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    InformationTopBarComponent,
    TimeCheckComponent,
    EmployeeCheckComponent,
    GeneralInfoComponent,
    JourneyCheckComponent
  ]
})
export class FeatureMonthlyReportComponent implements OnInit {

  public monthlyReport: MonthlyReport;
  private monthlyReportSubscription: Subscription;

  constructor(private monthlyReportService: MonthlyReportService) {
  }

  emitRefreshMonthlyReport() {
    this.refreshMonthlyReport();
  }

  ngOnInit(): void {
    this.getAllTimeEntries();
  }

  getAllTimeEntriesByDate(year: number, month: number): void {
    this.monthlyReportSubscription = this.monthlyReportService.getAllByDate(year, month)
      .subscribe((monthlyReport: MonthlyReport) => {
        this.monthlyReport = monthlyReport;
      });
  }

  getAllTimeEntries(): void {
    this.monthlyReportSubscription = this.monthlyReportService.getAll()
      .subscribe((monthlyReport: MonthlyReport) => {
        if (monthlyReport) {
          this.monthlyReport = monthlyReport;

          const date = new Date(monthlyReport.initialDate);
          this.monthlyReportService.selectedMonth.next(date.getMonth() + 1);
          this.monthlyReportService.selectedYear.next(date.getFullYear());
          this.emitRefreshMonthlyReport();
        }
      });
  }

  refreshMonthlyReport(): void {
    if (this.monthlyReport.initialDate == null) {
      // trigger skeleton loaders
      this.monthlyReport = null;
      this.getAllTimeEntriesByDate(this.monthlyReportService.selectedYear.getValue(), this.monthlyReportService.selectedMonth.getValue());
    } else {
      // prevent calling both service methods on initializing
      this.monthlyReport.initialDate = null;
    }
  }
}
