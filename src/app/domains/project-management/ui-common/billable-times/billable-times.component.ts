import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-billable-times',
  templateUrl: './billable-times.component.html',
  styleUrls: ['./billable-times.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    NgIf,
    DecimalPipe
  ]
})
export class BillableTimesComponent {

  @Input() billableTimes: string;
  @Input() nonBillableTimes: string;
  @Input() percentageOfHoursSpentInThisProject: number;

  transformTimeToFractionNumber(workingTime: string): number {
    if (!workingTime) {
      return undefined;
    }

    const spWorkingTime: string[] = workingTime.split(':');

    if (spWorkingTime.length < 1) {
      return 0;
    }

    return +(spWorkingTime[0]) + (+(spWorkingTime[1]) / 60);
  }
}
