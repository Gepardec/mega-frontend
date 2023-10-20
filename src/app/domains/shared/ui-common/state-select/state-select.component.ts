import {AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {State} from '@mega/shared/data-model';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';
import {MatOptionModule} from '@angular/material/core';

@Component({
  selector: 'app-state-select',
  templateUrl: './state-select.component.html',
  styleUrls: ['./state-select.component.scss'],
  standalone: true,
  imports: [
    MatSelectModule,
    MatOptionModule,
    TranslateModule
  ]
})
export class StateSelectComponent implements AfterViewChecked {

  State = State;

  @Input() value: State;
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  onSelectionChange(selectChange: MatSelectChange): void {
    this.selectionChange.emit(selectChange);
    this.value = selectChange.value;
  }
}
