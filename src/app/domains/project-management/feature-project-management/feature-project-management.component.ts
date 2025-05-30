import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectManagementEntry, ProjectManagementEntryViewModel} from '@mega/project-management/data-model';
import {MatDialog} from '@angular/material/dialog';
import {
  CommentsForEmployeeComponent,
  DatepickerMonthYearComponent,
  DoneCommentsIndicatorComponent,
  InlineTextEditorComponent,
  ProjectStateSelectComponent,
  StateIndicatorComponent,
  StateSelectComponent
} from '@mega/shared/ui-common';
import {SelectionModel} from '@angular/cdk/collections';
import {Comment, Config, Employee, ManagementEntry, ProjectState, State, Step} from '@mega/shared/data-model';
import {ProjectManagementService} from '@mega/project-management/data-service';
import {
  CommentService,
  ConfigService,
  ErrorService,
  ProjectCommentService,
  ProjectEntriesService,
  SnackbarService,
  StepEntriesService
} from '@mega/shared/data-service';

import * as _moment from 'moment';
import {Moment} from 'moment';
import {configuration} from '@mega/shared/util-constant';
import {MatSelectChange} from '@angular/material/select';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {finalize, forkJoin, mergeMap, Subscription, switchMap, tap, zip} from 'rxjs';
import * as ProjectManagementComparator from '@mega/project-management/util';
import {MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';
import {BillableTimesComponent, BillableTimesFractionComponent} from '@mega/project-management/ui-common';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {
  ThirdPartyServiceErrorComponent
} from '../ui-common/third-party-service-error/third-party-service-error.component';

const moment = _moment;

@Component({
  selector: 'app-project-management',
  templateUrl: './feature-project-management.component.html',
  styleUrls: ['./feature-project-management.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    DatepickerMonthYearComponent,
    NgIf,
    MatButtonModule,
    MatCardModule,
    NgxSkeletonLoaderModule,
    MatExpansionModule,
    NgFor,
    MatTooltipModule,
    ProjectStateSelectComponent,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    InlineTextEditorComponent,
    NgClass,
    MatTableModule,
    StateSelectComponent,
    StateIndicatorComponent,
    DoneCommentsIndicatorComponent,
    BillableTimesComponent,
    BillableTimesFractionComponent,
    TranslateModule,
    ThirdPartyServiceErrorComponent
  ]
})
export class FeatureProjectManagementComponent implements OnInit, OnDestroy {

  public State = State;

  pmEntries: Array<ProjectManagementEntryViewModel>;
  displayedColumns = [
    'select',
    'employeeName',
    'projectCheckState',
    'employeeCheckState',
    'internalCheckState',
    'doneCommentsIndicator',
    'projectHours'
  ];

  officeManagementUrl: string;
  pmSelectionModels: Map<string, SelectionModel<ManagementEntry>>;
  selectedYear: number;
  selectedMonth: number;
  showCommentEditor = false;
  forProjectName: string;
  tooltipShowDelay = 500;
  tooltipPosition = 'above' as TooltipPosition;
  maxMonthDate = 1;
  dateSelectionSub: Subscription;

  constructor(private dialog: MatDialog,
              private pmService: ProjectManagementService,
              private stepEntryService: StepEntriesService,
              private commentService: CommentService,
              private configService: ConfigService,
              private projectEntryService: ProjectEntriesService,
              private snackbarService: SnackbarService,
              private translate: TranslateService,
              private projectCommentService: ProjectCommentService,
              public errorService: ErrorService) {
  }

  get date() {
    return moment()
      .year(this.selectedYear)
      .month(this.selectedMonth)
      .date(1)
      .startOf('day');
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe((config: Config) => {
      this.officeManagementUrl = config.zepOrigin + '/' + configuration.OFFICE_MANAGEMENT_SEGMENT;
    });

    this.dateSelectionSub = zip(this.pmService.selectedYear, this.pmService.selectedMonth)
      .pipe(
        tap(value => {
          this.selectedYear = value[0];
          this.selectedMonth = value[1];
        }),
        tap(() => {
          this.pmEntries = null;
        }),
        switchMap(() => this.getPmEntries())
      ).subscribe(this.processPmEntries());
  }

  ngOnDestroy(): void {
    this.pmService.selectedYear.next(moment().subtract(1, 'month').year());
    this.pmService.selectedMonth.next(moment().subtract(1, 'month').month() + 1);

    this.dateSelectionSub?.unsubscribe();
  }

  private processPmEntries() {
    return pmEntries => {
      this.pmEntries = pmEntries;
      this.pmSelectionModels = new Map<string, SelectionModel<ManagementEntry>>();
      this.pmEntries.forEach(pmEntry => {
          this.pmSelectionModels.set(pmEntry.projectName, new SelectionModel<ManagementEntry>(true, []));

          const allDone = this.getFilteredAndSortedPmEntries(pmEntry, State.DONE, State.DONE, State.DONE);
          const notAllDone = pmEntry.entries.filter(entry => !allDone.find(done => done.employee.email === entry.employee.email))
            .sort((a, b) => a.employee.lastname.concat(a.employee.firstname)
              .localeCompare(b.employee.lastname.concat(b.employee.firstname)));

          pmEntry.entries = notAllDone.concat(allDone);

          // call this method AFTER pmEntry.entries modifcations are done
          this.checkAllProjectCheckStatesDone(pmEntry);

          this.projectCommentService.get(this.getFormattedDate(), pmEntry.projectName)
            .subscribe(projectComment => {
              pmEntry.projectComment = projectComment;
            });
        }
      );

      // reason for reverse: see comparePmEntriesFn doc
      this.pmEntries.sort(ProjectManagementComparator.comparePmEntriesFn).reverse();
    };
  }

  dateChanged(date: Moment): void {
    this.pmService.selectedYear.next(moment(date).year());
    this.pmService.selectedMonth.next(moment(date).month() + 1);
  }

  areAllSelected(projectName: string): boolean {
    return this.pmSelectionModels.get(projectName).selected.length === this.findEntriesForProject(projectName).length;
  }

  masterToggle(projectName: string): void {
    this.areAllSelected(projectName) ?
      this.pmSelectionModels.get(projectName).clear() :
      this.findEntriesForProject(projectName).forEach(row => this.pmSelectionModels.get(projectName).select(row));
  }

  openDialog(employee: Employee, project: string): void {
    this.commentService.getCommentsForEmployee(employee.email, this.getFormattedDate())
      .subscribe((comments: Array<Comment>) => {
        const dialogRef = this.dialog.open(CommentsForEmployeeComponent,
          {
            width: '100%',
            autoFocus: false
          }
        );

        dialogRef.componentInstance.employee = employee;
        dialogRef.componentInstance.comments = comments;
        dialogRef.componentInstance.step = Step.CONTROL_TIME_EVIDENCES;
        dialogRef.componentInstance.project = project;
        dialogRef.componentInstance.currentMonthYear = this.getFormattedDate();

        dialogRef.disableClose = true;
        dialogRef.componentInstance.commentHasChanged.pipe(
          tap(() => {
            this.pmEntries = null;
          }),
          mergeMap(() => {
            return this.getPmEntries();
          })
        ).subscribe(this.processPmEntries());
      });
  }

  isAnySelected(): boolean {
    if (this.pmSelectionModels) {
      return Array.from(this.pmSelectionModels.values())
        .filter(pmSelectionModel => pmSelectionModel?.selected.length > 0).length > 0;
    }
  }

  checkAllProjectCheckStatesDone(pmEntry: ProjectManagementEntryViewModel) {
    if (!pmEntry) {
      return;
    }

    pmEntry.allProjectCheckStatesDone = pmEntry.entries.every(entry => entry.projectCheckState === State.DONE);
  }

  closeProjectCheckForSelected(): void {
    const closeState = State.DONE;

    for (const [projectName, selectionModel] of this.pmSelectionModels.entries()) {
      if (selectionModel.selected.length > 0) {
        const $requests = selectionModel.selected.map(entry => {
          return this.stepEntryService.updateEmployeeStateForProject(entry.employee, projectName, this.getFormattedDate(), closeState)
        });

        // call checkAllProjectCheckStatesDone after all requests are done, because it depends on emplyoee's states
        forkJoin($requests)
          .pipe(
            finalize(() => selectionModel.clear())
          )
          .subscribe(results => {
            results.forEach((success, index) => {
              if (success) {
                selectionModel.selected[index].projectCheckState = closeState;
              }

            });

            this.checkAllProjectCheckStatesDone(this.pmEntries.find(entry => entry.projectName === projectName));
          });

      }
    }
  }

  updateProjectCheck($event: MatSelectChange, row: ManagementEntry, project: ProjectManagementEntryViewModel) {
    const newState: State = $event.value;
    this.stepEntryService
      .updateEmployeeStateForProject(row.employee, project.projectName, this.getFormattedDate(), newState)
      .subscribe(() => {
        row.projectCheckState = newState;
        this.checkAllProjectCheckStatesDone(project);
      });
  }

  getFilteredAndSortedPmEntries(pmEntry: ProjectManagementEntry, projectCheckState: State, employeeCheckState: State,
                                internalCheckState: State): Array<ManagementEntry> {
    return pmEntry.entries
      .filter(val => val.projectCheckState === projectCheckState &&
        val.employeeCheckState === employeeCheckState && val.internalCheckState === internalCheckState)
      .sort((a, b) => a.employee.lastname.concat(a.employee.firstname)
        .localeCompare(b.employee.lastname.concat(b.employee.firstname)));
  }

  onChangeControlProjectState($event: MatSelectChange, pmEntry: ProjectManagementEntry,
                              controlProjectStateSelect: ProjectStateSelectComponent): void {
    const newValue = $event.value as ProjectState;
    const preset = newValue !== 'NOT_RELEVANT' ? false : pmEntry.presetControlProjectState;

    this.projectEntryService.updateProjectEntry(newValue, preset, pmEntry.projectName, 'CONTROL_PROJECT', this.getFormattedDate())
      .subscribe((success) => {
        if (success) {
          pmEntry.controlProjectState = newValue;
          pmEntry.presetControlProjectState = preset;
        } else {
          this.snackbarService.showSnackbarWithMessage(this.translate.instant('project-management.updateStatusError'));
          controlProjectStateSelect.value = pmEntry.controlProjectState;
        }
      });
  }

  onChangeControlBillingState($event: MatSelectChange, pmEntry: ProjectManagementEntry, controlBillingStateSelect: ProjectStateSelectComponent): void {
    const newValue = $event.value as ProjectState;
    const preset = newValue !== 'NOT_RELEVANT' ? false : pmEntry.presetControlBillingState;

    this.projectEntryService.updateProjectEntry(newValue, preset, pmEntry.projectName, 'CONTROL_BILLING', this.getFormattedDate())
      .subscribe((success) => {
        if (success) {
          pmEntry.controlBillingState = newValue;
          pmEntry.presetControlBillingState = preset;
        } else {
          this.snackbarService.showSnackbarWithMessage(this.translate.instant('project-management.updateStatusError'));
          controlBillingStateSelect.value = pmEntry.controlBillingState;
        }
      });
  }

  onChangePresetControlProjectState($event: MatCheckboxChange, pmEntry: ProjectManagementEntry): void {
    this.projectEntryService.updateProjectEntry(pmEntry.controlProjectState, pmEntry.presetControlProjectState, pmEntry.projectName, 'CONTROL_PROJECT', this.getFormattedDate())
      .subscribe(success => {
        if (!success) {
          this.snackbarService.showSnackbarWithMessage(this.translate.instant('project-management.updateStatusError'));
          pmEntry.presetControlProjectState = !$event.checked;
        }
      });
  }

  onChangePresetControlBillingState($event: MatCheckboxChange, pmEntry: ProjectManagementEntry): void {
    this.projectEntryService.updateProjectEntry(pmEntry.controlBillingState, pmEntry.presetControlBillingState, pmEntry.projectName, 'CONTROL_BILLING', this.getFormattedDate())
      .subscribe(success => {
        if (!success) {
          this.snackbarService.showSnackbarWithMessage(this.translate.instant('project-management.updateStatusError'));
          pmEntry.presetControlBillingState = !$event.checked;
        }
      });
  }

  isProjectStateNotRelevant(projectState: ProjectState): boolean {
    return projectState === ProjectState.NOT_RELEVANT;
  }

  onStartEditing(projectName: string): void {
    this.forProjectName = projectName;
    this.showCommentEditor = true;
  }

  onCommentChange(pmEntry: ProjectManagementEntry, comment: string): void {
    this.showCommentEditor = false;
    this.forProjectName = null;

    let returnClicked = false;

    // Avoid reloading of page when the return button was clicked
    if (pmEntry.projectComment) {
      if (pmEntry.projectComment.comment !== comment) {
        const oldComment = pmEntry.projectComment.comment;
        pmEntry.projectComment.comment = comment;
        this.projectCommentService.update(pmEntry.projectComment)
          .subscribe((success) => {
            if (!success) {
              this.snackbarService.showSnackbarWithMessage(this.translate.instant('project-management.updateProjectCommentError'));
              pmEntry.projectComment.comment = oldComment;
            }
          });
      } else {
        returnClicked = true;
      }
    } else {
      // Avoid reloading of page when the return button was clicked
      if (comment) {
        this.projectCommentService.create(comment, this.getFormattedDate(), pmEntry.projectName)
          .subscribe(projectComment => {
            pmEntry.projectComment = projectComment;
          });
      } else {
        returnClicked = true;
      }
    }
    if (returnClicked) {
      this.snackbarService.showSnackbarWithMessage(this.translate.instant('project-management.projectCommentNotUpdated'));
    }
  }

  convertDurationToTime(durationInSeconds: number): number {
    return durationInSeconds / 60 / 60;
  }

  private getPmEntries() {
    return this.pmService.getEntries(this.selectedYear, this.selectedMonth, false);
  }

  private findEntriesForProject(projectName: string) {
    return this.pmEntries.filter(entry => {
      return entry.projectName === projectName;
    })[0].entries;
  }

  private getFormattedDate() {
    return moment().year(this.selectedYear).month(this.selectedMonth - 1).date(1).format(configuration.dateFormat);
  }
}
