import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {configuration} from '@mega/shared/util-constant';
import {OfficeManagementService} from '@mega/office-management/data-service';
import {
  CommentService,
  NotificationService,
  ProjectCommentService,
  SnackbarService,
  StepEntriesService
} from '@mega/shared/data-service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ProjectState, State} from '@mega/shared/data-model';
import {ProjectManagementService} from '@mega/project-management/data-service';
import {Subscription, switchMap, zip} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';
import {InlineTextEditorComponent, StateIndicatorComponent} from '@mega/shared/ui-common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ProjektNameWithZepLinkComponent} from '@mega/office-management/ui-common';
import {MatTableModule} from '@angular/material/table';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {ProjectOverview} from "../../data-model/project-overview";

const moment = _moment;


@Component({
  selector: 'app-project-overview-card',
  templateUrl: './project-overview-card.component.html',
  styleUrls: ['./project-overview-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgxSkeletonLoaderModule,
    MatTableModule,
    ProjektNameWithZepLinkComponent,
    StateIndicatorComponent,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    InlineTextEditorComponent,
    TranslateModule
  ]
})
export class ProjectOverviewCardComponent implements OnInit, OnDestroy {
  State = State;

  displayedColumns = ['name', 'controlEmployeesState', 'controlProjectState', 'controlBillingState', 'comment'];

  pmEntries: Array<ProjectOverview>;
  configuration = configuration;
  selectedYear: number;
  selectedMonth: number;
  dateSelectionSub: Subscription;
  showCommentEditor = false;
  forProjectName: string;
  tooltipShowDelay = 500;
  tooltipPosition = 'above' as TooltipPosition;

  constructor(private omService: OfficeManagementService, private pmService: ProjectManagementService,
              private notificationService: NotificationService, private translate: TranslateService, private commentService: CommentService,
              private stepEntryService: StepEntriesService, private _bottomSheet: MatBottomSheet, private projectCommentService: ProjectCommentService,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.dateSelectionSub = zip(this.omService.selectedYear, this.omService.selectedMonth)
      .pipe(tap(value => {
        this.selectedYear = value[0];
        this.selectedMonth = value[1];
      }), tap(() => {
        this.pmEntries = null;
      }), switchMap(() => this.getProjectOverview())).subscribe(pmEntries => {
        console.warn(pmEntries);
        this.pmEntries = this.sortPmEntries(pmEntries);
      });
  }

  ngOnDestroy(): void {
    this.dateSelectionSub?.unsubscribe();
  }

  onStartEditing(projectName: string) {
    this.forProjectName = projectName;
    this.showCommentEditor = true;
  }

  onCommentChange(pmEntry: ProjectOverview, comment: string) {
    this.showCommentEditor = false;
    this.forProjectName = null;

    let returnClicked = false;

    // Avoid reloading of page when the return button was clicked
    if (pmEntry.comment) {
      if (pmEntry.comment.comment !== comment) {
        let oldComment = pmEntry.comment.comment;
        pmEntry.comment.comment = comment;
        this.projectCommentService.update(pmEntry.comment)
          .subscribe((success) => {
            if (!success) {
              this.snackbarService.showSnackbarWithMessage(this.translate.instant('project-management.updateProjectCommentError'));
              pmEntry.comment.comment = oldComment;
            }
          });
      } else {
        returnClicked = true;
      }
    } else {
      // Avoid reloading of page when the return button was clicked
      if (comment) {
        this.projectCommentService.create(comment, this.getFormattedDate(), pmEntry.name)
          .subscribe(projectComment => {
            pmEntry.comment = projectComment;
          });
      } else {
        returnClicked = true;
      }
    }
    if (returnClicked) {
      this.snackbarService.showSnackbarWithMessage(this.translate.instant('project-management.projectCommentNotUpdated'));
    }
  }

  getTooltipText(projectState: ProjectState): string {
    return this.translate.instant('STATE.' + projectState);
  }

  private getFormattedDate() {
    return moment().year(this.selectedYear).month(this.selectedMonth - 1).date(1).format(configuration.dateFormat);
  }

  private getProjectOverview() {
    return this.omService.projectOverview(this.selectedYear, this.selectedMonth);
  }

  private sortPmEntries(pmEntries: Array<ProjectOverview>) {
    if (!pmEntries) {
      return pmEntries;
    }

    return pmEntries.sort((a, b) => a.name.localeCompare(b.name));
  }
}
