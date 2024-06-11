import {Component, OnDestroy, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig, cypressAuthConfig} from '@mega/shared/util-auth';
import {Router} from '@angular/router';
import {ConfigService, ErrorService, UserService} from '@mega/shared/data-service';
import {catchError, firstValueFrom, interval, Observable, of, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import { InfoComponent } from './domains/shared/ui-common/info/info.component';
import { HeaderComponent } from './domains/shared/ui-common/header/header.component';
import {LivenessInfoList} from "./domains/shared/data-model/LivenessInfoList";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [HeaderComponent, InfoComponent]
})

export class AppComponent implements OnInit, OnDestroy {

  configServiceSubscription: Subscription;
  private livenessSubscription: Subscription

  constructor(private router: Router,
              private oAuthService: OAuthService,
              private configService: ConfigService,
              private userService: UserService,
              private translate: TranslateService,
              private livenessService: ErrorService) {
    translate.addLangs(['de']);
    translate.setDefaultLang('de');
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

    this.livenessSubscription = interval(3000).subscribe(() =>
      this.configService.getLiveness()
        .pipe(
          tap(livenessObject => this.livenessService.setLivenessInfo(livenessObject)),
          catchError((response: HttpErrorResponse) => {
            console.log(response.error)
            this.livenessService.setLivenessInfo(response.error);
            return of(response);
          })
        ).subscribe());


  }

  ngOnDestroy(): void {
    this.configServiceSubscription?.unsubscribe();
    this.livenessSubscription?.unsubscribe();
  }
}
