import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

  getBillsForEmployee(employeeId: string, year: number, month: number): Observable<Array<BillData>> {
    // leading zero is needed for correct request --> queryParam
    let dateString = `${year}-${month.toString().padStart(2, '0')}`;
    let params = new HttpParams().set('from', dateString);

    return this.httpClient.get<Array<BillData>>(
      this.config.getBackendUrlWithContext('/worker/' + employeeId + '/bills'),
      {params}
    );
  }
}
