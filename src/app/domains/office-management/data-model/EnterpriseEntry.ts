import {ProjectState} from '@mega/shared/data-model';

export class EnterpriseEntry {
  zepTimesReleased: ProjectState;
  chargeabilityExternalEmployeesRecorded: ProjectState;
  payrollAccountingSent: ProjectState;
  currentMonthYear: string;

  constructor(zepTimesReleased: ProjectState, chargeabilityExternalEmployeesRecorded: ProjectState, payrollAccountingSent: ProjectState, currentMonthYear: string) {
    this.zepTimesReleased = zepTimesReleased;
    this.chargeabilityExternalEmployeesRecorded = chargeabilityExternalEmployeesRecorded;
    this.payrollAccountingSent = payrollAccountingSent;
    this.currentMonthYear = currentMonthYear;
  }
}
