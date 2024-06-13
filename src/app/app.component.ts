import {Component, DestroyRef, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig, cypressAuthConfig} from '@mega/shared/util-auth';
import {ConfigService, ErrorService, UserService} from '@mega/shared/data-service';
import {catchError, firstValueFrom, interval, of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import { InfoComponent } from '@mega/shared/ui-common';
import { HeaderComponent } from '@mega/shared/ui-common';
import {HttpErrorResponse} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [HeaderComponent, InfoComponent]
})

export class AppComponent implements OnInit {

  constructor(private oAuthService: OAuthService,
              private configService: ConfigService,
              private userService: UserService,
              private translate: TranslateService,
              private livenessService: ErrorService,
              private destroyRef: DestroyRef) {
    this.translate.addLangs(['de']);
    this.translate.setDefaultLang('de');
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

    interval(3000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() =>
        this.configService.getLiveness()
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            tap(livenessObject => this.livenessService.setLivenessInfo(livenessObject)),
            catchError((response: HttpErrorResponse) => {
              this.livenessService.setLivenessInfo(response.error);
              return of(response);
            })
        ).subscribe());
  }
}
