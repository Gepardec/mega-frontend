import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '@mega/shared/data-service';
import {Observable} from 'rxjs';
import {EnterpriseEntry} from '@mega/office-management/data-model';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseEntriesService {

  constructor(private httpClient: HttpClient,
              private config: ConfigService) {
  }

  getEnterpriseEntry(year: number, month: number): Observable<EnterpriseEntry> {
    return this.httpClient.get<EnterpriseEntry>(
      this.config.getBackendUrlWithContext('/enterprise/entriesformonthyear/' + year + '/' + month));
  }

  updateEnterpriseEntry(enterpriseEntry: EnterpriseEntry, year: number, month: number): Observable<boolean> {
    return this.httpClient.put<boolean>(this.config.getBackendUrlWithContext('/enterprise/entry/' + year + '/' + month), enterpriseEntry);
  }
}
