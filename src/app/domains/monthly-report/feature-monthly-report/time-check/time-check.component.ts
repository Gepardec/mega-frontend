import {Component, Input} from '@angular/core';
import {MonthlyReport, TimeWarning} from '@mega/monthly-report/data-model';
import {State} from '@mega/shared/data-model';
import {TranslateModule} from '@ngx-translate/core';
import {MatTableModule} from '@angular/material/table';
import {StateIndicatorComponent} from '@mega/shared/ui-common';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {DatePipe, NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-time-check',
  templateUrl: './time-check.component.html',
  styleUrls: ['./time-check.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgxSkeletonLoaderModule,
    StateIndicatorComponent,
    MatTableModule,
    DatePipe,
    TranslateModule
  ]
})
export class TimeCheckComponent {

  State = State;

  @Input() monthlyReport: MonthlyReport;

  displayedColumns = ['warningIcon', 'date', 'description'];

  emptyTimeWarnings: TimeWarning = {
    date: '',
    description: ['Keine Einträge']
  };

  getSortedTimeWarnings() {
    if (this.monthlyReport.timeWarnings.length === 0) {
      return [this.emptyTimeWarnings];
    }

    return this.monthlyReport.timeWarnings.sort((a, b) => Date.parse(a.date).valueOf() - Date.parse(b.date).valueOf());
  }
}
