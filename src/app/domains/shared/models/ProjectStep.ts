import {Employee} from './Employee';
import {State} from './State';

export class ProjectStep {

  stepId: number;
  employee: Employee;
  projectName: string;
  currentMonthYear: string;
  newState: State;

  constructor(stepId: number, employee: Employee, projectName: string, currentMonthYear: string, newState: State) {
    this.stepId = stepId;
    this.employee = employee;
    this.projectName = projectName;
    this.currentMonthYear = currentMonthYear;
    this.newState = newState;
  }
}
