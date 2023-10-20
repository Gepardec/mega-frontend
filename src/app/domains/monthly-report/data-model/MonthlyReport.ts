import {TimeWarning} from './TimeWarning';
import {JourneyWarning} from './JourneyWarning';
import {Comment} from '../../shared/data-model/Comment';
import {Employee} from '../../shared/data-model/Employee';
import {PmProgress} from './PmProgress';
import {State} from '../../shared/data-model/State';

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
