import {Component, Inject, OnInit} from '@angular/core';
import {PmProgress, State} from '@mega/shared/data-model';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {StateIndicatorComponent} from '../state-indicator/state-indicator.component';
import {MatTableModule} from '@angular/material/table';

class DisplayedEmployees {
  name: string;
  state: State;

  constructor(name: string, state: State) {
    this.name = name;
    this.state = state;
  }
}

@Component({
  selector: 'app-employee-progress',
  templateUrl: './pm-progress.component.html',
  styleUrls: ['./pm-progress.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    StateIndicatorComponent,
    TranslateModule
  ]
})
export class PmProgressComponent implements OnInit {

  pmProgresses: Array<PmProgress>;
  internalCheckState: State;
  displayedEmployees: Array<DisplayedEmployees>;
  displayedColumns = ['in-charge', 'checked'];

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private translateService: TranslateService) {
    this.pmProgresses = data.employeeProgresses;
    this.internalCheckState = data.internalCheckState;
  }

  ngOnInit(): void {
    this.buildDisplayedEmployees();
  }

  private buildDisplayedEmployees() {
    this.displayedEmployees = new Array<DisplayedEmployees>();

    this.translateService.get('monthly-report.pm-progress-bottom-sheet.office-management').subscribe(translation => {
      this.displayedEmployees.push(new DisplayedEmployees(translation, this.internalCheckState));
    });

    const map: Map<string, Array<State>> = new Map<string, Array<State>>();
    this.pmProgresses.forEach(pmProgress => {
      const name = pmProgress.firstname + ' ' + pmProgress.lastname;
      if (map.has(name)) {
        map.get(name).push(pmProgress.state);
      } else {
        map.set(name, new Array<State>(pmProgress.state));
      }
    });

    map.forEach(((value, key) => {
      const allDone: boolean = value.every(state => state === State.DONE);
      this.displayedEmployees.push(new DisplayedEmployees(
        key,
        allDone ? State.DONE : State.OPEN
      ));
    }));
  }
}
