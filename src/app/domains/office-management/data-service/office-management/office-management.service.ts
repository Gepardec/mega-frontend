import {Injectable} from '@angular/core';
import {ConfigService} from '@mega/shared/data-service';
import {CustomerProjectWithoutLeads, Employee, ManagementEntry} from '@mega/shared/data-model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import * as _moment from 'moment';
import {ProjectOverview} from "../../data-model/project-overview";

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
    if (projectStateLogicSingle) {
      params = new HttpParams().append('projectStateLogicSingle', `${projectStateLogicSingle}`);
    }


    return this.httpClient.get<Array<ManagementEntry>>(
      this.configService.getBackendUrlWithContext('/officemanagement/officemanagemententries/' + year + '-' + month.toString().padStart(2, '0')),
      {params},
    );
  }

  projectOverview(year: number, month: number): Observable<Array<ProjectOverview>> {
    return this.httpClient.get<Array<ProjectOverview>>(
      this.configService.getBackendUrlWithContext('/officemanagement/projectOverview/' + year + '-' + month.toString().padStart(2, '0')),
    );
  }

  updateEmployees(employees: Array<Employee>): Observable<Response> {
    return this.httpClient.put<Response>(this.configService.getBackendUrlWithContext('/employees'), employees);
  }

  getProjectsWithoutLeads() {
    return this.httpClient.get<CustomerProjectWithoutLeads[]>(
      this.configService.getBackendUrlWithContext('/officemanagement/projectsWithoutLeads')
    );
  }
}
