import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {CommentService, StepEntriesService} from '@mega/shared/data-service';
import {State, Step, User} from '@mega/shared/data-model';
import {MatListModule, MatSelectionListChange} from '@angular/material/list';
import {MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {PmProgressComponent, StateIndicatorComponent} from '@mega/shared/ui-common';
import {MonthlyReportService} from '@mega/monthly-report/data-service';
import * as moment from 'moment';
import {convertMomentToString, isElementOverlyingCursor, toMonthYearString} from '@mega/shared/util-common';
import {Subscription, zip} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {
  EmployeeCheckConfirmCommentDialogComponent
} from '../employee-check-confirm-comment-dialog/employee-check-confirm-comment-dialog.component';
import {
  EmployeeCheckConfirmDialogAction,
  EmployeeCheckConfirmDialogActionType
} from '../employee-check-confirm-comment-dialog/model/EmployeeCheckConfirmDialogAction';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {DatePipe, NgClass, NgFor, NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {PrematureEmployeeCheckService} from '../../../shared/data-service/premature-employee-check/premature-employee-check.service';
import {MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-employee-check',
  templateUrl: './employee-check.component.html',
  styleUrls: ['./employee-check.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgxSkeletonLoaderModule,
    StateIndicatorComponent,
    MatButtonModule,
    MatListModule,
    NgFor,
    NgClass,
    DatePipe,
    TranslateModule,
    PmProgressComponent,
    MatBottomSheetModule,
    MatTooltipModule
  ]
})
export class EmployeeCheckComponent implements OnInit, OnChanges, OnDestroy {

  State = State;

  @Input() monthlyReport: MonthlyReport;
  @Output() refreshMonthlyReport: EventEmitter<void> = new EventEmitter<void>();

  employeeProgressRef: MatBottomSheetRef;
  overlaysButton: boolean;
  selectedDateStr;
  employeeCheckIcon: string;
  employeeCheckText: string;
  noTimesCurrentMonth: boolean;
  isPrematureEmployeeCheck = false;
  tooltipShowDelay = 500;
  tooltipPosition = 'right' as TooltipPosition;
  private dateSelectionSub: Subscription;

  constructor(
    public commentService: CommentService,
    private monthlyReportService: MonthlyReportService,
    public stepEntriesService: StepEntriesService,
    private prematureEmployeeCheckService: PrematureEmployeeCheckService,
    private bottomSheet: MatBottomSheet,
    @Inject(LOCALE_ID) private locale: string,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dateSelectionSub = zip(this.monthlyReportService.selectedYear, this.monthlyReportService.selectedMonth)
      .pipe(
        tap(value => {
          this.selectedDateStr = toMonthYearString(value[0], value[1] - 1, this.locale);
        })
      ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.monthlyReport) {
      this.setGuiElements();
    }
  }

  ngOnDestroy(): void {
    this.dateSelectionSub?.unsubscribe();
    this.employeeProgressRef?.dismiss();
  }

  selectionChange(change: MatSelectionListChange): void {
    const comment = change.options[0].value;

    this.commentService.finish(comment).subscribe(() => {
      const updatedComment = this.monthlyReport.comments.find(value => value.id === comment.id);
      updatedComment.state = State.DONE;

      const allCommentDone: boolean = this.monthlyReport.comments.every(c => c.state === State.DONE);
      if (allCommentDone) {
        this.emitRefreshMonthlyReport();
      }
    });
  }

  setOpenAndUnassignedStepEntriesDone(): void {
    const closeDate = this.getSelectedDate();

    this.stepEntriesService
      .close(this.monthlyReport.employee, Step.CONTROL_TIMES, convertMomentToString(closeDate))
      .subscribe(() => {
        this.emitRefreshMonthlyReport();
      });
  }

  setOpenAndUnassignedStepEntriesPrematurelyDone(): void {
    const closeDate = this.getSelectedDate();

    const employee = this.monthlyReport.employee;
    const user: User = {email: employee.email, firstname: employee.firstname, lastname: employee.lastname, roles: [], userId: ''};


    this.prematureEmployeeCheckService
      .prematurelyClose(user, convertMomentToString(closeDate))
      .subscribe(() => {
        this.emitRefreshMonthlyReport();
      });
  }

  emitRefreshMonthlyReport(): void {
    this.refreshMonthlyReport.emit();
  }

  openEmployeeProgress($event?: MouseEvent): void {
    this.employeeProgressRef = this.bottomSheet.open(PmProgressComponent, {
      data: {
        employeeProgresses: this.monthlyReport.employeeProgresses,
        internalCheckState: this.monthlyReport.internalCheckState
      },
      autoFocus: false,
      hasBackdrop: false
    });
    const bottomSheetContainer = document.querySelector('mat-bottom-sheet-container');

    this.overlaysButton = isElementOverlyingCursor(bottomSheetContainer, $event);

    bottomSheetContainer?.addEventListener('mouseleave', () => {
      this.employeeProgressRef.dismiss();
      this.overlaysButton = false;
    });
  }

  closeEmployeeProgress(): void {
    if (!this.overlaysButton) {
      this.employeeProgressRef.dismiss();
    }
  }

  parseBody(body: string): string {
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/igm;
    return body.replace(urlPattern, '<a href=\$& target="_blank"\>$&</a>');
  }

  openStateInProgressReasonDialog() {
    const dialogRef = this.dialog.open(EmployeeCheckConfirmCommentDialogComponent,
      {
        data: {
          reason: this.monthlyReport?.employeeCheckStateReason
        },
        width: '100%',
        autoFocus: false,
        restoreFocus: false
      }
    );

    dialogRef.afterClosed().subscribe((result: EmployeeCheckConfirmDialogAction) => {
      if (result?.type === EmployeeCheckConfirmDialogActionType.SAVE) {
        const input = result.payload as string;

        const date = this.getSelectedDate();

        this.stepEntriesService
          .updateEmployeeStateForOffice(
            this.monthlyReport.employee, Step.CONTROL_TIMES, convertMomentToString(date), State.IN_PROGRESS, input)
          .subscribe(() => {
            this.emitRefreshMonthlyReport();
          });
      }
    });
  }

  resetState() {
    const date = this.getSelectedDate();

    this.stepEntriesService
      .updateEmployeeStateForOffice(this.monthlyReport.employee, Step.CONTROL_TIMES, convertMomentToString(date), State.OPEN, null)
      .subscribe(() => {
        this.emitRefreshMonthlyReport();
      });
  }

  private setGuiElements() {
    if (!this.monthlyReport) {
      this.employeeCheckIcon = undefined;
      this.employeeCheckText = '';

      return;
    }

    let stateIndicatorState = this.monthlyReport.employeeCheckState;
    let stateIndicatorText = '';
    let noTimesCurrentMonth = false;
    let stateIsPrematureEmployeeCheck = false;

    switch (this.monthlyReport.employeeCheckState) {
      case State.PREMATURE_CHECK:
        stateIsPrematureEmployeeCheck = true;
        if (this.getSelectedDate().isSame(moment().date(1).startOf('day'))) {
          stateIndicatorText = 'monthly-report.prematureEmployeeCheck.prematureEmployeeCheckStateIndicatorText';
          stateIndicatorState = State.OPEN;
          if (this.monthlyReport.hasPrematureEmployeeCheck) {
            stateIndicatorText = 'monthly-report.prematureEmployeeCheck.prematureEmployeeCheckedMonthState';
            stateIndicatorState = State.IN_PROGRESS;
          }
        } else {
          stateIndicatorText = 'monthly-report.noTimesCurrentMonth';
          stateIndicatorState = State.IN_PROGRESS;
          noTimesCurrentMonth = true;
        }
        break;

      case State.OPEN:
        stateIndicatorText = 'monthly-report.pleaseCheckPrompt';
        break;

      case State.IN_PROGRESS:
        stateIndicatorText = 'monthly-report.inProgressDescription';
        break;

      case State.DONE:
        if (this.monthlyReport.otherChecksDone) {
          stateIndicatorText = 'monthly-report.checkSuccess';
        } else {
          stateIndicatorState = State.IN_PROGRESS;
          stateIndicatorText = 'monthly-report.checkWip';
        }
        break;
    }

    this.employeeCheckIcon = stateIndicatorState;
    this.monthlyReport.employeeCheckState = stateIndicatorState;
    this.employeeCheckText = stateIndicatorText;
    this.noTimesCurrentMonth = noTimesCurrentMonth;
    this.isPrematureEmployeeCheck = stateIsPrematureEmployeeCheck;
  }

  private getSelectedDate() {
    return moment()
      .year(this.monthlyReportService.selectedYear.value)
      .month(this.monthlyReportService.selectedMonth.value - 1)
      .date(1)
      .startOf('day');
  }
}
