import {Injectable, isDevMode} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Config} from '@mega/shared/data-model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {HealthResponse} from '../../data-model/HealthResponse';

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
    const origin = window.location.origin.replace(environment.frontendOriginSegment, environment.backendOriginSegment);

    if (isDevMode()) {
      return origin;
    }

    return origin.replace('-temp', '');
  }

  getNewFrontendUrl() {
    const origin = window.location.origin;

    if (isDevMode()) {
      return origin;
    }

    return origin.replace('-temp', '');
  }


  getBackendUrlWithContext(context: string): string {
    return this.getBackendUrl() + context;
  }

  getWellness(): Observable<HealthResponse> {
    return this.httpClient.get<HealthResponse>(this.getBackendUrlWithContext('/health/well'));
  }
}
