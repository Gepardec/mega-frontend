import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigService, RolesService, UserService} from '@mega/shared/data-service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {of, Subscription} from 'rxjs';
import {Config, Link} from '@mega/shared/data-model';
import {OAuthModule} from 'angular-oauth2-oidc';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let rolesService: RolesService;
  let userService: UserService;
  let translate: TranslateService;
  let breakpointObserver: BreakpointObserver;
  let configService: ConfigService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HeaderComponent,
        OAuthModule.forRoot(),
        TranslateModule.forRoot(),
        NoopAnimationsModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;

      rolesService = TestBed.inject(RolesService);
      userService = TestBed.inject(UserService);
      translate = TestBed.inject(TranslateService);
      breakpointObserver = TestBed.inject(BreakpointObserver);
      configService = TestBed.inject(ConfigService);
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#afterConstruction - should push 3 links', () => {
    fixture.detectChanges();

    expect(component.links.length).toEqual(3);
  });

  it('#afterInit - should call userService.user and configService.getConfig', () => {
    fixture.detectChanges();

    spyOn(configService, 'getConfig').and.returnValue(of(ConfigServiceMock.getConfig()));

    component.ngOnInit();

    expect(configService.getConfig).toHaveBeenCalled();
  });

  it('#afterDestroy', () => {
    fixture.detectChanges();

    spyOn(userService.user, 'subscribe').and.returnValue(new Subscription());

    component.ngOnInit();
    fixture.detectChanges();

    expect((component as any).userSubscription.closed).toBeFalse();
    component.ngOnDestroy();

    expect((component as any).userSubscription.closed).toBeTrue();
  });

  it('#showLink - should return isAllowed', () => {
    fixture.detectChanges();

    spyOn(rolesService, 'isAllowed').and.returnValue(true);

    const isAllowed = component.showLink(LinkMock.getLink());

    expect(rolesService.isAllowed).toHaveBeenCalled();
    expect(isAllowed).toBeTrue();
  });

  it('#onLogout - should call userService.logout()', () => {
    fixture.detectChanges();

    spyOn(userService, 'logout').and.stub();

    component.onLogout();

    expect(userService.logout).toHaveBeenCalled();
  });

  class ConfigServiceMock {

    static getConfig(): Config {
      return {
        clientId: 'DUMMY',
        scope: 'email',
        issuer: 'https://accounts.google.com',
        version: '1',
        zepOrigin: 'DUMMY',
        budgetCalculationExcelUrl: 'DUMMY'
      };
    }
  }

  class LinkMock {

    static getLink(): Link {
      return {
        name: 'name',
        path: 'localhost:8080'
      }
    }
  }
});
