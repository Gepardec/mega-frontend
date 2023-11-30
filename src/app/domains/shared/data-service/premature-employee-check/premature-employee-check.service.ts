import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '@mega/shared/data-service';
import {User} from '@mega/shared/data-model';
import {Observable} from 'rxjs';
import {PrematureEmployeeCheck} from '../../data-model/PrematureEmployeeCheck';

@Injectable({
  providedIn: 'root'
})
export class PrematureEmployeeCheckService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigService
  ) {
  }

  add(prematureEmployeeCheck: PrematureEmployeeCheck): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.config.getBackendUrlWithContext('/prematureemployeecheck/'),
      prematureEmployeeCheck
    );
  }
}