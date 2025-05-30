import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {LoggingService, UserService} from '@mega/shared/data-service';
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
    private userService: UserService,
    private loggingService: LoggingService,
    private ngZone: NgZone
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
      this.userService.logoutWithoutRedirect();
    } else {
      redirectUrl = this.router.url;
    }

    this.errorService.storeLastErrorData(message, redirectUrl);
    // TODO: use of zone is dangerous and should be avoided
    //  as mentioned above we should move the router to error-service to solve cyclic dependency
    this.ngZone.run(() => this.router.navigate([configuration.PAGE_URLS.ERROR]));
  }
}
