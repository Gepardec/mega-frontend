import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatDatepicker, MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {configuration} from '../../constants/configuration';

import * as _moment from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

const moment = _moment;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ]
})
export class DatepickerComponent {

  @Input() selectedDate: string;
  @Output() dateEmitter: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('picker') datePicker: MatDatepicker<Date>;

  today: Date = new Date();

  emitEvent(date: string): void {
    this.dateEmitter.emit(date);
  }

  getDateAndEmitEvent(event: MatDatepickerInputEvent<Date>) {
    const date: string = moment(event.value).format(configuration.dateFormat);
    this.emitEvent(date);
  }
}
