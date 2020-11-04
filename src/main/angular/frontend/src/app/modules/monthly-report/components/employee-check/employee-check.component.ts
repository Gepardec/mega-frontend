import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MonthlyReport} from '../../models/MonthlyReport';
import {CommentService} from '../../../shared/services/comment/comment.service';
import {State} from '../../../shared/models/State';
import {MatSelectionListChange} from '@angular/material/list';
import {ErrorHandlerService} from "../../../shared/services/error/error-handler.service";
import {StepentriesService} from "../../../shared/services/stepentries/stepentries.service";

@Component({
  selector: 'app-employee-check',
  templateUrl: './employee-check.component.html',
  styleUrls: ['./employee-check.component.scss']
})
export class EmployeeCheckComponent implements OnInit {
  @Input() monthlyReport: MonthlyReport;
  @Output() refreshMonthlyReport: EventEmitter<void> = new EventEmitter<void>();
  State = State;

  constructor(
    public commentService: CommentService,
    public errorHandlerService: ErrorHandlerService,
    public stepentriesService: StepentriesService) {
  }

  ngOnInit(): void {
  }

  selectionChange(change: MatSelectionListChange): void {
    const comment = change.option.value;

    this.commentService.setStatusDone(comment).subscribe((updated: number) => {
      const updatedComment = this.monthlyReport.comments.find(value => value.id === comment.id);
      updatedComment.state = State.DONE;

      const allCommentDone: boolean = this.monthlyReport.comments.every(c => c.state === State.DONE);
      if (allCommentDone) {
        this.emitRefreshMonthlyReport();
      }
    })
  }

  setOpenAndUnassignedStepEntriesDone() {
    this.stepentriesService.setOpenAndUnassignedStepEntriesDone(this.monthlyReport.employee).subscribe((success: boolean) => {
      this.emitRefreshMonthlyReport();
    });
  }

  emitRefreshMonthlyReport() {
    this.refreshMonthlyReport.emit();
  }
}