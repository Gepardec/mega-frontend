import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '@mega/shared/data-service';
import {Employee, EmployeeStep, Step} from '@mega/shared/data-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrematureEmployeeCheckService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigService
  ) {
  }


  prematurelyClose(employee: Employee, step: Step, currentMonthYear: string): Observable<boolean> {
    return this.httpClient.put<boolean>(
      this.config.getBackendUrlWithContext('/prematureemployeecheck/'),
      new EmployeeStep(step, employee, currentMonthYear)
    );
  }
}
