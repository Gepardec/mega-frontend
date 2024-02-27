import {Component, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {MonthlyReportService} from '@mega/monthly-report/data-service';
import {Subscription, zip} from 'rxjs';
import {tap} from 'rxjs/operators';
import {toMonthYearString} from '@mega/shared/util-common';
import {MatTableModule} from '@angular/material/table';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {LeadsData} from '../../data-model/LeadsData';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgxSkeletonLoaderModule,
    MatTableModule,
  ]
})
export class LeadsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() monthlyReport: MonthlyReport;

  displayedColumns = ['description', 'value'];
  public selectedDateStr;
  private dateSelectionSub: Subscription;

  constructor(public monthlyReportService: MonthlyReportService, @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit() {
    this.dateSelectionSub = zip(this.monthlyReportService.selectedYear, this.monthlyReportService.selectedMonth)
      .pipe(
        tap(value => {
          this.selectedDateStr = toMonthYearString(value[0], value[1] - 1, this.locale);
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.dateSelectionSub?.unsubscribe();
  }

  toLeadsData(): LeadsData[] {
    return [
      {
        description: 'Gilden-Lead',
        value: this.monthlyReport.guildLead == null ?
          'nicht vorhanden' : this.monthlyReport.guildLead
      },
      {
        description: 'Interner Projektleiter',
        value: this.monthlyReport.internalProjectLead == null ?
          'nicht vorhanden' : this.monthlyReport.internalProjectLead
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.monthlyReport) {
      this.setDefaultValues();
    }
  }
  setDefaultValues(): void {
    if (this.monthlyReport) {
      this.monthlyReport.guildLead = this.leadOrDefault(this.monthlyReport.guildLead);
      this.monthlyReport.internalProjectLead = this.leadOrDefault(this.monthlyReport.internalProjectLead);
    }
  }

  leadOrDefault(lead: string): string {
    return lead == null ? 'nicht vorhanden' : lead;
  }
}
