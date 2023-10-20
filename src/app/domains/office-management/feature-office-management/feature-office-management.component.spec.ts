import {ComponentFixture, fakeAsync, flush, TestBed, waitForAsync} from '@angular/core/testing';

import {FeatureOfficeManagementComponent} from './feature-office-management.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OfficeManagementService} from '../data-service/office-management.service';

import * as _moment from 'moment';

const moment = _moment;

describe('FeatureOfficeManagementComponent', () => {

  let component: FeatureOfficeManagementComponent;
  let fixture: ComponentFixture<FeatureOfficeManagementComponent>;

  let officeManagementService: OfficeManagementService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        FeatureOfficeManagementComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(FeatureOfficeManagementComponent);
      component = fixture.componentInstance;

      officeManagementService = TestBed.inject(OfficeManagementService);
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getDate - should selected date with day of month 1', () => {
    fixture.detectChanges();

    component.selectedMonth = DateMock.month;
    component.selectedYear = DateMock.year;

    expect(component.date).toEqual(moment().year(DateMock.year).month(DateMock.month).date(1).startOf('day'));
  });

  it('#afterInit - should set selectedYear and selectedMonth', fakeAsync(() => {
    fixture.detectChanges();

    component.ngOnInit();
    flush();

    expect(component.selectedYear).toEqual(moment().subtract(1, 'month').year());
    expect(component.selectedMonth).toEqual(moment().subtract(1, 'month').month() + 1);
  }));

  it('#afterDestroy - should call omService.selectedYear.next and omService.selectedMonth.next and call dateSelectionSub.unsubscribe', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(officeManagementService.selectedYear, 'next').and.stub();
    spyOn(officeManagementService.selectedMonth, 'next').and.stub();
    spyOn(component.dateSelectionSub, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    flush();

    expect(officeManagementService.selectedYear.next).toHaveBeenCalled();
    expect(officeManagementService.selectedMonth.next).toHaveBeenCalled();
    expect(component.dateSelectionSub.unsubscribe).toHaveBeenCalled();
  }));

  it('#dateChanged - should call omService.selectedYear.next and omService.selectedMonth.next', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(officeManagementService.selectedYear, 'next').and.stub();
    spyOn(officeManagementService.selectedMonth, 'next').and.stub();

    component.dateChanged(moment());
    flush();

    expect(officeManagementService.selectedYear.next).toHaveBeenCalled();
    expect(officeManagementService.selectedMonth.next).toHaveBeenCalled();
  }));

  class DateMock {
    static month = 1;
    static year = 2020;
  }
});
