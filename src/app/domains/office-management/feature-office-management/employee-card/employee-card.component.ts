import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManagementEntry} from '@mega/shared/data-model';
import {State} from '@mega/shared/data-model';
import {MatDialog} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';
import {configuration} from '@mega/shared/util-constant';
import {environment} from '../../../../../environments/environment';
import {OfficeManagementService} from '../../data-service/office-management/office-management.service';
import {NotificationService} from '@mega/shared/data-service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {CommentService} from '@mega/shared/data-service';
import {
  CommentsForEmployeeComponent
} from '@mega/shared/ui-common';
import {StepEntriesService} from '@mega/shared/data-service';
import {Step} from '@mega/shared/data-model';

import * as _moment from 'moment';
import {Moment} from 'moment';
import {PmProgressComponent} from '@mega/shared/ui-common';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {ConfigService} from '@mega/shared/data-service';
import {Config} from '@mega/shared/data-model';
import {finalize, firstValueFrom, mergeMap, Subscription, switchMap, zip} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatSelectChange} from '@angular/material/select';
import {
  DoneCommentsIndicatorComponent
} from '@mega/shared/ui-common';
import {StateIndicatorComponent} from '@mega/shared/ui-common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {StateSelectComponent} from '@mega/shared/ui-common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {DatepickerComponent} from '@mega/shared/ui-common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

const moment = _moment;

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgxSkeletonLoaderModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    DatepickerComponent,
    MatTableModule,
    MatCheckboxModule,
    StateSelectComponent,
    MatTooltipModule,
    StateIndicatorComponent,
    DoneCommentsIndicatorComponent,
    NgClass,
    DatePipe,
    TranslateModule
  ]
})
export class EmployeeCardComponent implements OnInit, OnDestroy {
  State = State;

  employeeProgressRef: MatBottomSheetRef;

  displayedColumns = [
    'select',
    'name',
    'internalCheckState',
    'employeeCheckState',
    'projectCheckState',
    'actions',
    'releaseDate'
  ];

  officeManagementUrl: string;
  omEntries: Array<ManagementEntry>;
  filteredOmEntries: Array<ManagementEntry>;
  omSelectionModel = new SelectionModel<ManagementEntry>(true, []);
  selectedDate: string;
  dayOfMonthForWarning = 5;
  configuration = configuration;
  environment = environment;
  selectedYear: number;
  selectedMonth: number;
  dateSelectionSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private omService: OfficeManagementService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private commentService: CommentService,
    private stepEntryService: StepEntriesService,
    private _bottomSheet: MatBottomSheet,
    private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe((config: Config) => {
      this.officeManagementUrl = config.zepOrigin + '/' + configuration.OFFICE_MANAGEMENT_SEGMENT;
    });

    this.dateSelectionSub = zip(this.omService.selectedYear, this.omService.selectedMonth)
      .pipe(
        tap(value => {
          this.selectedYear = value[0];
          this.selectedMonth = value[1];
        }),
        tap(() => {
          this.omEntries = null;
          this.filteredOmEntries = null;
        }),
        switchMap(() => this.getOmEntries())
      ).subscribe(omEntries => {
        this.handleGetOmEntriesResult(omEntries);
      });
  }

  ngOnDestroy(): void {
    this.dateSelectionSub?.unsubscribe();
  }

  dateChanged(date: Moment) {
    this.selectedYear = moment(date).year();
    this.selectedMonth = moment(date).month() + 1;
    this.getOmEntries();
  }

  areAllSelected() {
    return this.omEntries && this.omSelectionModel.selected.length === this.omEntries.length;
  }

  masterToggle() {
    this.areAllSelected() ? this.omSelectionModel.clear() : this.omEntries.forEach(row => this.omSelectionModel.select(row));
  }

  async openDialog(omEntry: ManagementEntry): Promise<void> {
    const comments = await firstValueFrom(this.commentService.getCommentsForEmployee(omEntry.employee.email, this.getFormattedDate()));

    const dialogRef = this.dialog.open(CommentsForEmployeeComponent,
      {
        width: '100%',
        autoFocus: false
      });

    dialogRef.componentInstance.employee = omEntry.employee;
    dialogRef.componentInstance.comments = comments;
    dialogRef.componentInstance.step = Step.CONTROL_INTERNAL_TIMES;
    dialogRef.componentInstance.currentMonthYear = this.getFormattedDate();

    dialogRef.disableClose = true;
    dialogRef.componentInstance.commentHasChanged.pipe(
      tap(() => {
        this.omEntries = null;
        this.filteredOmEntries = null;
      }),
      mergeMap(() => {
        return this.getOmEntries();
      })
    ).subscribe(omEntries => {
      this.omEntries = omEntries;
      this.filteredOmEntries = this.getFilteredAndSortedOmEntries();
    });
  }

  changeDate(emittedDate: string): void {
    this.selectedDate = emittedDate;
  }

  filterOmEntriesByEmployeeName(filterString: string): void {
    if (!filterString) {
      this.filteredOmEntries = this.omEntries.slice();
      return;
    }
    filterString = filterString.toLowerCase();
    this.filteredOmEntries = this.omEntries.filter(omEntry => {
      return omEntry.employee.firstname.toLowerCase().includes(filterString) ||
        omEntry.employee.lastname.toLowerCase().includes(filterString);
    });
  }

  getReleaseDateCssClass(date: string): string {
    const today = new Date();
    const releaseDate = new Date(date);
    const monthDiff = this.monthDiff(releaseDate, today);
    if (monthDiff === 1 || monthDiff === 0 || releaseDate > today) {
      return 'done';
    }
    if (monthDiff === 2 && today.getDate() <= this.dayOfMonthForWarning) {
      return 'wip';
    }
    return 'open';
  }

  async releaseEmployees(): Promise<void> {
    const employees = this.omSelectionModel.selected.map(omEntry => {
      omEntry.employee.releaseDate = this.selectedDate;
      return omEntry.employee;
    });

    await firstValueFrom(this.omService.updateEmployees(employees));

    this.filteredOmEntries = null;

    this.getOmEntries().subscribe(omEntries => {
      this.handleGetOmEntriesResult(omEntries);
    });

    const successMessage = await firstValueFrom(this.translateService.get('notifications.employeesUpdatedSuccess'));
    this.notificationService.showSuccess(successMessage);
  }

  private handleGetOmEntriesResult(omEntries: Array<ManagementEntry>) {
    this.omEntries = omEntries;
    this.filteredOmEntries = this.getFilteredAndSortedOmEntries();
  }

  updateInternalCheck($event: MatSelectChange, omEntry: ManagementEntry) {
    const newState: State = $event.value;
    this.stepEntryService
      .updateEmployeeStateForOffice(omEntry.employee, Step.CONTROL_INTERNAL_TIMES, this.getFormattedDate(), newState)
      .subscribe(() => {
        omEntry.internalCheckState = newState;
      });
  }

  openEmployeeProgress(omEntry: ManagementEntry) {
    this.employeeProgressRef = this._bottomSheet.open(PmProgressComponent, {
      data: {employeeProgresses: omEntry.employeeProgresses},
      autoFocus: false,
      hasBackdrop: false
    });
  }

  closeEmployeeProgress() {
    this.employeeProgressRef.dismiss();
  }

  private getFormattedDate() {
    return moment().year(this.selectedYear).month(this.selectedMonth - 1).date(1).format(configuration.dateFormat);
  }

  private getOmEntries() {
    // Clear selection after reloading
    return this.omService.getEntries(this.selectedYear, this.selectedMonth, true)
      .pipe(
        finalize(() => this.omSelectionModel.clear())
      );
  }

  private monthDiff(d1: Date, d2: Date) {
    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return Math.abs(months);
  }

  getFilteredAndSortedOmEntries() {
    return this.omEntries
      .filter(val => val.internalCheckState === State.OPEN)
      .concat(this.omEntries.filter(val => val.internalCheckState === State.DONE))
      .sort((a, b) => a.employee.lastname.concat(a.employee.firstname)
        .localeCompare(b.employee.lastname.concat(b.employee.firstname)));
  }
}
