import {Component, OnInit} from '@angular/core';
import {ProjectManagementEntry} from '../models/ProjectManagementEntry';
import {MatDialog} from '@angular/material/dialog';
import {CommentsForEmployeeComponent} from '../../shared/components/comments-for-employee/comments-for-employee.component';
import {SelectionModel} from '@angular/cdk/collections';
import {State} from '../../shared/models/State';
import {ProjectManagementService} from '../services/project-management.service';
import {ManagementEntry} from '../../shared/models/ManagementEntry';
import {Employee} from "../../shared/models/Employee";
import {Step} from "../../shared/models/Step";
import {StepentriesService} from "../../shared/services/stepentries/stepentries.service";

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {
  pmEntries: Array<ProjectManagementEntry>;
  displayedColumns = [
    'select',
    'employeeName',
    'projectCheckState',
    'employeeCheckState',
    'internalCheckState',
    'customerCheckState',
    'doneCommentsIndicator'
  ];
  pmSelectionModels: Array<SelectionModel<ManagementEntry>>;

  constructor(private dialog: MatDialog,
              private pmService: ProjectManagementService,
              private stepEntryService: StepentriesService) {
  }

  ngOnInit(): void {
    this.getPmEntries();
  }

  areAllSelected(projectIndex: number, projectName: string) {
    return this.pmSelectionModels[projectIndex].selected.length === this.findEntriesForProject(projectName).length;
  }

  masterToggle(projectIndex: number, projectName: string) {
    this.areAllSelected(projectIndex, projectName) ?
      this.pmSelectionModels[projectIndex].clear() :
      this.findEntriesForProject(projectName).forEach(row => this.pmSelectionModels[projectIndex].select(row));
  }

  openDialog(pmEntry: ProjectManagementEntry): void {
    const dialogRef = this.dialog.open(CommentsForEmployeeComponent,
      {
        width: '100%',
        autoFocus: false,
      }
    );

    dialogRef.componentInstance.employee = null; // FIXME pmEntry.employee;
    // dialogRef.componentInstance.comments = pmEntry.comments; // TODO load comments for employee
  }

  isAnySelected(): boolean {
    if (this.pmSelectionModels) {
      return this.pmSelectionModels.filter(pmSelectionModel => pmSelectionModel.selected.length > 0).length > 0;
    }
  }

  areAllProjectCheckStatesDone(projectName: string): boolean {
    return this.findEntriesForProject(projectName).every(entry => entry.projectCheckState === State.DONE);
  }

  closeProjectCheck(employee: Employee) {
    this.stepEntryService.close(employee, Step.CONTROL_TIME_EVIDENCES).subscribe(() => console.log('closed'));
  }

  private getPmEntries() {
    this.pmService.getEntries().subscribe((pmEntries: Array<ProjectManagementEntry>) => {
      this.pmEntries = pmEntries;
      this.pmSelectionModels = [];
      this.pmEntries.forEach(
        () => this.pmSelectionModels.push(new SelectionModel<ManagementEntry>(true, []))
      );
    });
  }

  private findEntriesForProject(projectName: string) {
    return this.pmEntries.filter(entry => {
      return entry.projectName === projectName;
    })[0].entries;
  }
}
