import {Employee} from './Employee';

export class NewCommentEntry {
  stepId: number;
  employeeEmail: string;
  comment: string;
  assigneeEmail: string;
  project: string;
  currentMonthYear: string;

  constructor(stepId: number, employeeEmail: string, comment: string, assigneEmail: string, project: string, currentMonthYear: string) {
    this.stepId = stepId;
    this.employeeEmail = employeeEmail;
    this.comment = comment;
    this.assigneeEmail = assigneEmail;
    this.project = project;
    this.currentMonthYear = currentMonthYear;
  }
}
