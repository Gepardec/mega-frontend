import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {AngularMaterialModule} from "../../../material-module";
import {EmployeesPagesModule} from "./home.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../../app-routing.module";
import {MainLayoutModule} from "../../../shared/main-layout/main-layout/main-layout.module";
import {AppModule} from "../../../app.module";
import {AuthenticationService} from "../../../signin/authentication.service";
import {AuthService} from "angularx-social-login";
import {MockAuthService} from "../../../signin/MockAuthService";
import {UserActionsComponent} from "../../../shared/navigation/header/user-actions/user-actions.component";
import {MockAuthenticationService} from "../../../signin/MockAuthenticationService";
import {NgZone} from "@angular/core";

describe('HomeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MainLayoutModule,
        AppModule,
        EmployeesPagesModule,
        AngularMaterialModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [],
      providers: [
        {provide: AuthenticationService, useClass: MockAuthenticationService},
        {provide: AuthService, useClass: MockAuthService},
      ]
    })
      .compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<HomeComponent> = TestBed.createComponent(HomeComponent);
    const app: HomeComponent = fixture.debugElement.componentInstance;

    return {fixture, app};
  }

  it('should create', () => {
    const {fixture, app} = setup();
    expect(app).toBeTruthy();
  });
});
