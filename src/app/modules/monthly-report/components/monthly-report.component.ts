import {Component, OnInit} from '@angular/core';
import {MonthlyReport} from '../models/MonthlyReport';
import {Subscription} from 'rxjs';
import {MonthlyReportService} from '../services/monthly-report.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent implements OnInit {

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
          this.monthlyReportService.selectedMonth.next(date.getMonth());
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
      // on initial load don't call both
      this.monthlyReport.initialDate = null;
    }
  }
}
