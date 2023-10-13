import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {configuration} from '../../../shared/constants/configuration';
import {environment} from '../../../../../environments/environment';
import {OfficeManagementService} from '../../services/office-management.service';
import {NotificationService} from '../../../shared/services/notification/notification.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {CommentService} from '../../../shared/services/comment/comment.service';
import {StepEntriesService} from '../../../shared/services/stepentries/step-entries.service';
import {State} from '../../../shared/models/State';
import {ProjectManagementEntry} from '../../../project-management/models/ProjectManagementEntry';
import {ProjectManagementService} from '../../../project-management/services/project-management.service';
import {Subscription, switchMap, zip} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ProjectState} from '../../../shared/models/ProjectState';
import {ProjectCommentService} from '../../../shared/services/project-comment/project-comment.service';
import {SnackbarService} from '../../../shared/services/snackbar/snackbar.service';
import {MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';
import {InlineTextEditorComponent} from '../../../shared/components/inline-text-editor/inline-text-editor.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {StateIndicatorComponent} from '../../../shared/components/state-indicator/state-indicator.component';
import {ProjektNameWithZepLinkComponent} from '../projekt-name-with-zep-link/projekt-name-with-zep-link.component';
import {MatTableModule} from '@angular/material/table';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

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

  pmEntries: Array<ProjectManagementEntry>;
  configuration = configuration;
  environment = environment;
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
      }), switchMap(() => this.getPmEntries())).subscribe(pmEntries => {
        console.warn(pmEntries);
        this.pmEntries = this.sortPmEntries(pmEntries);
        this.pmEntries.forEach(pmEntry => {
          this.projectCommentService.get(this.getFormattedDate(), pmEntry.projectName)
            .subscribe(projectComment => {
              pmEntry.projectComment = projectComment;
            });
        });
      });
  }

  ngOnDestroy(): void {
    this.dateSelectionSub?.unsubscribe();
  }

  areAllEmployeeChecksDone(pmEntry: ProjectManagementEntry): ProjectState {
    if (pmEntry.entries.every(value => value.projectCheckState === State.DONE)) {
      return ProjectState.DONE;
    }
    return ProjectState.OPEN;
  }

  onStartEditing(projectName: string) {
    this.forProjectName = projectName;
    this.showCommentEditor = true;
  }

  onCommentChange(pmEntry: ProjectManagementEntry, comment: string) {
    this.showCommentEditor = false;
    this.forProjectName = null;

    let returnClicked = false;

    // Avoid reloading of page when the return button was clicked
    if (pmEntry.projectComment) {
      if (pmEntry.projectComment.comment !== comment) {
        let oldComment = pmEntry.projectComment.comment;
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

  getTooltipText(projectState: ProjectState): string {
    return this.translate.instant('STATE.' + projectState);
  }

  private getFormattedDate() {
    return moment().year(this.selectedYear).month(this.selectedMonth - 1).date(1).format(configuration.dateFormat);
  }

  private getPmEntries() {
    return this.pmService.getEntries(this.selectedYear, this.selectedMonth, true);
  }

  private sortPmEntries(pmEntries: Array<ProjectManagementEntry>) {
    if (!pmEntries) {
      return pmEntries;
    }

    return pmEntries.sort((a, b) => a.projectName.localeCompare(b.projectName));
  }
}
