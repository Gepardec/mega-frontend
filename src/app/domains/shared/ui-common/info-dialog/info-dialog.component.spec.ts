import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {InfoDialogComponent} from '@mega/shared/ui-common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {InfoService} from '@mega/shared/data-service';
import {AppInfo} from '@mega/shared/data-model';
import {of} from 'rxjs';

describe('InfoDialogComponent', () => {

  let component: InfoDialogComponent;
  let fixture: ComponentFixture<InfoDialogComponent>;

  let infoService: InfoService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        InfoDialogComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(InfoDialogComponent);
      component = fixture.componentInstance;

      infoService = TestBed.inject(InfoService);
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#afterInit - should call infoService.getInfo()', () => {
    fixture.detectChanges();

    spyOn(infoService, 'getInfo').and.returnValue(of(InfoMock.info));

    component.ngOnInit();

    expect(infoService.getInfo).toHaveBeenCalled();
  });

  class InfoMock {

    static info: AppInfo = {
      version: '1.0.0',
      upTime: '3d 11h 25m 31s',
      startedAt: '04.02.2022 03:42',
      commit: '231baee1356e29d97787747c5739ab7ce03ee906',
      buildNumber: 0,
      buildDate: '01.02.2022 11:20',
      branch: 'hotfix/3.2.2'
    };
  }
});
