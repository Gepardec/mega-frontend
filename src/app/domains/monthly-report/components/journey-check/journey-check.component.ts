import {Component, Input} from '@angular/core';
import {MonthlyReport} from '../../models/MonthlyReport';
import {State} from '../../../shared/models/State';
import {TranslateModule} from '@ngx-translate/core';
import {MatTableModule} from '@angular/material/table';
import {StateIndicatorComponent} from '../../../shared/components/state-indicator/state-indicator.component';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {DatePipe, NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-journey-check',
  templateUrl: './journey-check.component.html',
  styleUrls: ['./journey-check.component.scss'],
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
export class JourneyCheckComponent {

  State = State;

  @Input() monthlyReport: MonthlyReport;

  displayedColumns = ['dateJourney', 'warningJourney'];

  getJourneyWarningString(warnings: Array<string>): string {
    let warningString = '';

    warnings.forEach((value) => warningString += value + '. ');

    return warningString;
  }
}
