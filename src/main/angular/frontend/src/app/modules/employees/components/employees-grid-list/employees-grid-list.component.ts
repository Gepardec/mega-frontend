import {Component, Input, OnInit} from '@angular/core';
import {configuration} from '../../../shared/constants/configuration';
import {Employee} from '../../models/Employee';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DatePickerDialogComponent} from './date-picker-dialog/date-picker-dialog.component';

@Component({
  selector: 'app-employees-grid-list',
  templateUrl: './employees-grid-list.component.html',
  styleUrls: ['./employees-grid-list.component.scss']
})
// FIXME: gridlist no longer needed remove at given time
export class EmployeesGridListComponent implements OnInit {

  readonly date = new Date();
  readonly functions = configuration.EMPLOYEE_FUNCTIONS;

  @Input() employees: Array<Employee>;
  @Input() pageSize: number;
  @Input() pageIndex: number;

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  openDialog(employee: Employee): void {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = employee;
    const dialogRef = this.dialog.open(DatePickerDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed ${result}`);
    });
  }

  stringToDate(date: string): Date {
    return new Date(date);
  }

}
