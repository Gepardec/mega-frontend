import {ErrorHandler, Injectable} from '@angular/core';
import {LoggingService} from '@mega/shared/data-service';
import {ErrorService} from './error.service';
import {configuration} from '@mega/shared/util-constant';
import {Router} from '@angular/router';
import {HttpStatusCode} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(
    private errorService: ErrorService,
    private router: Router,
    private loggingService: LoggingService,
  ) {
  }

  handleError(error: any): void {
    const message = this.errorService.getErrorMessage(error);
    this.loggingService.writeToLog(message, configuration.LogLevel.Debug);

    const logout = error.status === HttpStatusCode.Unauthorized || error.status === HttpStatusCode.Forbidden;

    this.showErrorPage(message, logout);
  }

  showErrorPage(message: string, logout: boolean) {
    let redirectUrl;

    if (logout) {
      redirectUrl = configuration.PAGE_URLS.LOGIN;
    } else {
      redirectUrl = this.router.url;
    }

    this.errorService.storeLastErrorData(message, redirectUrl);
  }
}
