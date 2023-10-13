import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-billable-times-fraction',
  templateUrl: './billable-times-fraction.component.html',
  styleUrls: ['./billable-times-fraction.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    NgIf,
    DecimalPipe
  ]
})
export class BillableTimesFractionComponent {

  @Input() billableTimes: number;
  @Input() nonBillableTimes: number;

}
