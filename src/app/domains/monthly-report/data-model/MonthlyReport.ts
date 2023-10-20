import {TimeWarning} from './TimeWarning';
import {JourneyWarning} from './JourneyWarning';
import {Comment, Employee, PmProgress, State} from '@mega/shared/data-model';

export class MonthlyReport {
  comments: Array<Comment>;
  timeWarnings: Array<TimeWarning>;
  journeyWarnings: Array<JourneyWarning>;
  employeeCheckState: string;
  employeeCheckStateReason?: string;
  internalCheckState: State;
  otherChecksDone: boolean;
  assigned: boolean;
  employee: Employee;
  initialDate: string;
  employeeProgresses: Array<PmProgress>;
  vacationDays: number;
  homeofficeDays: number;
  compensatoryDays: number;
  billableTime: string;
  totalWorkingTime: string;
  paidSickLeave: number;
  vacationDayBalance: number;
}
