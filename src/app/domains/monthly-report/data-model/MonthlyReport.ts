import {TimeWarning} from './TimeWarning';
import {JourneyWarning} from './JourneyWarning';
import {Comment, Employee, PmProgress, State} from '@mega/shared/data-model';
import { PrematureEmployeeCheckState } from '../../shared/data-model/PrematureEmployeeCheckState';

export class MonthlyReport {
  comments: Array<Comment>;
  timeWarnings: Array<TimeWarning>;
  journeyWarnings: Array<JourneyWarning>;
  employeeCheckState: string;
  employeeCheckStateReason?: string;
  internalCheckState: State;
  otherChecksDone: boolean;
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
  overtime: number;
  prematureEmployeeCheckState: PrematureEmployeeCheckState;
}
