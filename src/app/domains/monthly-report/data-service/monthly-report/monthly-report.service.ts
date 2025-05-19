import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {BehaviorSubject, combineLatest, distinctUntilChanged, Observable, shareReplay} from 'rxjs';
import {ConfigService} from '@mega/shared/data-service';
import * as _moment from 'moment';
import {map} from "rxjs/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class MonthlyReportService {

  monthlyReport: MonthlyReport;

  selectedYear = new BehaviorSubject<number>(moment().year());
  selectedMonth = new BehaviorSubject<number>(moment().month());


  billablePercentage: number;
  totalWorkingTimeHours: number;
  billableTimeHours: number;

  constructor(
    private httpClient: HttpClient,
    private config: ConfigService) {
  }

  getAll(): Observable<MonthlyReport> {
    return this.httpClient.get<MonthlyReport>(this.config.getBackendUrlWithContext('/worker/monthendreports'));
  }

  getAllByDate(year: number, month: number): Observable<MonthlyReport> {
    return this.httpClient.get<MonthlyReport>(this.config.getBackendUrlWithContext(`/worker/monthendreports/${year}-${month.toString().padStart(2, '0')}`));
  }
}
