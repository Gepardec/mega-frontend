import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {MitarbeiterType} from "../../../../models/Mitarbeiter/Mitarbeiter/MitarbeiterType";
import {SelectionChange, SelectionModel} from "@angular/cdk/collections";
import {configuration} from "../../../../../configuration/configuration";
import {Subscription} from "rxjs";
import {DisplayEmployeeListService} from "../../display-employee-list/display-employee-list.service";

@Component({
  selector: 'app-tablelist',
  templateUrl: './tablelist.component.html',
  styleUrls: ['./tablelist.component.scss']
})
export class TablelistComponent implements OnInit, OnDestroy {

  readonly functions = configuration.EMPLOYEE_FUNCTIONS;

  displayedColumns = ['nachname', 'abteilung', 'freigabedatum', 'auswaehlen'];
  dataSource: MatTableDataSource<MitarbeiterType> = new MatTableDataSource<MitarbeiterType>();
  selection = new SelectionModel<MitarbeiterType>(true, null);
  @Input('employees') employees;

  private selectionChangedSubscription: Subscription;

  constructor(
    private displayMitarbeiterService: DisplayEmployeeListService
  ) {
  }

  ngOnInit() {
    this.dataSource.data = this.employees.mitarbeiterListe.mitarbeiter;
    this.selectionChangedSubscription = this.selection.changed.subscribe(
      (selectedEmployees: SelectionChange<MitarbeiterType>) => {
        this.displayMitarbeiterService.setSelectedEmployees(selectedEmployees);
      }
    );

    this.displayMitarbeiterService.resetSelection.subscribe((resetSelection: boolean) => {
      this.selection.clear();
    });
  }

  ngOnDestroy(): void {
    this.selectionChangedSubscription && this.selectionChangedSubscription.unsubscribe();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
