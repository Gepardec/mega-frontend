import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ConfigService} from "@mega/shared/data-service";
import {Observable} from "rxjs";
import {MonthlyBillInfoData} from "../../../monthly-report/data-model/MonthlyBillInfoData";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(
    private httpClient: HttpClient,
    private config: ConfigService
  ) {
  }

  getBillsForEmployee(year: number, month: number): Observable<MonthlyBillInfoData> {
    // leading zero is needed for correct request --> queryParam
    let dateString = `${year}-${month.toString().padStart(2, '0')}`;
    let params = new HttpParams().set('from', dateString);

    return this.httpClient.get<MonthlyBillInfoData>(
      this.config.getBackendUrlWithContext('/worker/bills'),
      {params}
    );
  }
}
