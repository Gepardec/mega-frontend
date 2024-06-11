import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Config} from '@mega/shared/data-model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {LivenessInfoList} from "../../data-model/LivenessInfoList";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: Config;

  constructor(private httpClient: HttpClient) {
  }

  getConfig(): Observable<Config> {
    if (this.config) {
      return new BehaviorSubject(this.config);
    } else {
      return this.httpClient.get<Config>(this.getBackendUrlWithContext('/config'))
        .pipe(tap(resultConfig => this.config = resultConfig));
    }
  }

  getBackendUrl(): string {
    return window.location.origin.replace(environment.frontendOriginSegment, environment.backendOriginSegment);
  }

  getBackendUrlWithContext(context: string): string {
    return this.getBackendUrl() + context;
  }

  getLiveness(): Observable<LivenessInfoList> {
    return this.httpClient.get<LivenessInfoList>(this.getBackendUrlWithContext('/health'));
  }
}
