import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig, cypressAuthConfig} from '@mega/shared/util-auth';
import {ConfigService, ErrorService, UserService} from '@mega/shared/data-service';
import {catchError, firstValueFrom, of, switchMap, timer} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {HeaderComponent, InfoComponent} from '@mega/shared/ui-common';
import {HttpErrorResponse} from '@angular/common/http';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {HealthResponse} from './domains/shared/data-model/HealthResponse';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [HeaderComponent, InfoComponent]
})
export class AppComponent implements OnInit {
  constructor(
    private oAuthService: OAuthService,
    private configService: ConfigService,
    private userService: UserService,
    private translate: TranslateService,
    private errorService: ErrorService,
  ) {
    this.translate.addLangs(['de']);
    this.translate.setDefaultLang('de');

    // Query wellness endpoint every minute
    timer(0, 60 * 1000)
      .pipe(
        takeUntilDestroyed(),
        switchMap(() =>
          this.configService
            .getWellness()
            .pipe(
              catchError((error: HttpErrorResponse) =>
                of(error.error as HealthResponse)
              )
            )
        )
      )
      .subscribe((wellnessResponse) =>
        this.errorService.setWellnessResponse(wellnessResponse)
      );
  }

  async ngOnInit(): Promise<void> {
    const config = await firstValueFrom(this.configService.getConfig());

    this.oAuthService.configure({
      clientId: config.clientId,
      issuer: config.issuer,
      scope: config.scope,
      // @ts-ignore
      ...(window.Cypress ? cypressAuthConfig : authConfig)
    });

    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    this.oAuthService.setupAutomaticSilentRefresh();

    if (this.userService.loggedInWithGoogle()) {
      this.userService.loginUser();
    }
  }
}
