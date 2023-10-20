import {Injectable} from '@angular/core';
import {Employee} from '@mega/shared/data-model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../config/config.service';
import {EmployeeStep} from '@mega/shared/data-model';
import {Step} from '@mega/shared/data-model';
import {State} from '@mega/shared/data-model';
import {ProjectStep} from '@mega/shared/data-model';
import {UpdateEmployeeStep} from '@mega/shared/data-model';

@Injectable({
  providedIn: 'root'
})
export class StepEntriesService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigService
  ) {
  }

  close(employee: Employee, step: Step, currentMonthYear: string): Observable<boolean> {
    return this.httpClient.put<boolean>(
      this.config.getBackendUrlWithContext('/stepentry/close'),
      new EmployeeStep(step, employee, currentMonthYear)
    );
  }

  /**
   *
   * @return true if the operation was successful
   */
  updateEmployeeStateForOffice(employee: Employee, step: Step, currentMonthYear: string, newState: State, newStateReason?: string): Observable<boolean> {
    return this.httpClient.put<boolean>(
      this.config.getBackendUrlWithContext('/stepentry/updateEmployeeStateForOffice'),
      new UpdateEmployeeStep(step, employee, currentMonthYear, newState, newStateReason)
    );
  }

  /**
   *
   * @return true if the operation was successful
   */
  updateEmployeeStateForProject(employee: Employee, projectName: string, currentMonthYear: string, newState: State): Observable<boolean> {
    return this.httpClient.put<boolean>(
      this.config.getBackendUrlWithContext('/stepentry/updateEmployeeStateForProject'),
      new ProjectStep(Step.CONTROL_TIME_EVIDENCES, employee, projectName, currentMonthYear, newState)
    );
  }
}
