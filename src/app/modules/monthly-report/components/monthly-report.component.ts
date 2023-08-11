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
        this.monthlyReport = monthlyReport;
    });
  }

  refreshMonthlyReport(): void {
    // trigger skeleton loaders
    this.monthlyReport = null;
    this.getAllTimeEntriesByDate(this.monthlyReportService.selectedYear.getValue(), this.monthlyReportService.selectedMonth.getValue() + 1);
  }
}
