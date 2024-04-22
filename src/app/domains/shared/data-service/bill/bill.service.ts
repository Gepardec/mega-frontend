import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "@mega/shared/data-service";
import {Observable} from "rxjs";
import {BillData} from "../../../monthly-report/data-model/BillData";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigService
  ) {
  }

  getBillsForEmployee(employeeId: string): Observable<Array<BillData>> {
    return this.httpClient.get<Array<BillData>>(
      this.config.getBackendUrlWithContext('/employees/' + employeeId + '/bills')
    );
  }
}
