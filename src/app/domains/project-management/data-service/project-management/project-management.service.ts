import {Injectable} from '@angular/core';
import {ConfigService} from '@mega/shared/data-service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProjectManagementEntry} from '@mega/project-management/data-model';
import * as _moment from 'moment';
import {CustomerProjectWithoutLeads} from '@mega/shared/data-model';

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {

  selectedYear = new BehaviorSubject<number>(moment().subtract(1, 'month').year());
  selectedMonth = new BehaviorSubject<number>(moment().subtract(1, 'month').month() + 1);

  constructor(private configService: ConfigService, private httpClient: HttpClient) {
  }

  getEntries(year: number, month: number, all: boolean): Observable<Array<ProjectManagementEntry>> {
    const params: HttpParams = new HttpParams().append('all', `${all}`);

    return this.httpClient.get<Array<ProjectManagementEntry>>(
      this.configService.getBackendUrlWithContext('/management/projectmanagemententries/' + year + '-' + month.toString().padStart(2, '0')),
      {
        params: params
      });
  }

  getProjectsWithoutLeads() {
    return this.httpClient.get<CustomerProjectWithoutLeads[]>(
      this.configService.getBackendUrlWithContext('/management/projectsWithoutLeads')
    );
  }
}
