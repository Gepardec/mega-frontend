import {Component, Input, OnInit} from '@angular/core';
import {MitarbeiterResponseType} from "../../../../models/Mitarbeiter/MitarbeiterResponseType";
import {MitarbeiterType} from "../../../../models/Mitarbeiter/Mitarbeiter/MitarbeiterType";
import {configuration} from "../../../../../configuration/configuration";
import {DisplayEmployeeListService} from "../../display-employee-list/display-employee-list.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {DatePickerDialogComponent} from "./date-picker-dialog/date-picker-dialog.component";

@Component({
  selector: 'app-gridlist',
  templateUrl: './gridlist.component.html',
  styleUrls: ['./gridlist.component.scss']
})
export class GridlistComponent implements OnInit {

  readonly functions = configuration.EMPLOYEE_FUNCTIONS;

  @Input('employees') employees: MitarbeiterResponseType;
  @Input('pageSize') pageSize: number;
  @Input('pageIndex') pageIndex: number;

  constructor(
    private displayEmployeeListService: DisplayEmployeeListService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  openDialog(employee: MitarbeiterType): MatDialogRef<DatePickerDialogComponent, MatDialogConfig> {
    let config: MatDialogConfig = new MatDialogConfig();
    config.data = employee;
    const dialogRef = this.dialog.open(DatePickerDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed ${result}`);
    });
    return dialogRef;
  }


}
