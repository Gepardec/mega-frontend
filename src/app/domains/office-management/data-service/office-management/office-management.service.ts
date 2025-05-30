import {Injectable} from '@angular/core';
import {ConfigService} from '@mega/shared/data-service';
import {Employee, ManagementEntry} from '@mega/shared/data-model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import * as _moment from 'moment';

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class OfficeManagementService {

  selectedYear = new BehaviorSubject<number>(moment().subtract(1, 'month').year());
  selectedMonth = new BehaviorSubject<number>(moment().subtract(1, 'month').month() + 1);

  constructor(private configService: ConfigService,
              private httpClient: HttpClient) {
  }

  getEntries(year: number, month: number, projectStateLogicSingle: boolean): Observable<Array<ManagementEntry>> {
    let params: HttpParams;
    if (projectStateLogicSingle){
      params = new HttpParams().append('projectStateLogicSingle', `${projectStateLogicSingle}`);
    }


    return this.httpClient.get<Array<ManagementEntry>>(
      this.configService.getBackendUrlWithContext('/management/officemanagemententries/' + year + '-' + month.toString().padStart(2, '0')),
      {params},
    );
  }

  updateEmployees(employees: Array<Employee>): Observable < Response > {
    return this.httpClient.put<Response>(this.configService.getBackendUrlWithContext('/employees'), employees);
  }
}
