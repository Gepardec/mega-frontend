import {computed, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {HealthResponse} from '../../data-model/HealthResponse';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  message: string;
  redirectUrl: string;
  private wellnessResponseSubject = new BehaviorSubject<HealthResponse | undefined>(undefined);

  readonly wellness = computed(toSignal(this.wellnessResponseSubject));
  readonly isUp = computed(() => this.wellness().status === 'UP');
  readonly isDown = computed(() => this.wellness().status === 'DOWN');
  readonly getZepCheck = computed(() => this.wellness().checks.find(check => check.name === 'ZEP'));
  readonly getPersonioCheck = computed(() => this.wellness().checks.find(check => check.name === 'Personio'));

  storeLastErrorData(message: string, redirectPage: string) {
    this.message = message;
    this.redirectUrl = redirectPage;
  }

  removeLastErrorData() {
    delete this.message;
  }

  getErrorMessage(error: Error): string {
    if (error instanceof HttpErrorResponse) {
      // Server Error
      return this.getServerMessage(error);
    }
    // Client Error
    return this.getClientMessage(error);
  }

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string {
    return error.message;
  }

  getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return error.error;
  }

  setWellnessResponse(wellnessResponse: HealthResponse): void {
    this.wellnessResponseSubject.next(wellnessResponse);
  }
}
