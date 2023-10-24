import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../config/config.service';
import {AppInfo} from '@mega/shared/data-model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private megaInfo: AppInfo;

  constructor(private httpClient: HttpClient, private config: ConfigService) {
  }

  getInfo(): Observable<AppInfo> {
    if (this.megaInfo) {
      return new BehaviorSubject(this.megaInfo);
    } else {
      return this.httpClient.get<AppInfo>(this.config.getBackendUrlWithContext('/info'))
        .pipe(tap(info => this.megaInfo = info));
    }
  }
}
