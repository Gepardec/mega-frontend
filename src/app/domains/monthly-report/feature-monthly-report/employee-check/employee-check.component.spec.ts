import {ComponentFixture, fakeAsync, flush, TestBed, waitForAsync} from '@angular/core/testing';

import {EmployeeCheckComponent} from './employee-check.component';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {OAuthModule} from 'angular-oauth2-oidc';
import {Comment, Employee, State} from '@mega/shared/data-model';
import * as _moment from 'moment';
import {configuration} from '@mega/shared/util-constant';
import {CommentService, StepEntriesService} from '@mega/shared/data-service';
import {of} from 'rxjs';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

const moment = _moment;
const DATE_FORMAT: string = configuration.dateFormat;

describe('EmployeeCheckComponent', () => {

  let component: EmployeeCheckComponent;
  let fixture: ComponentFixture<EmployeeCheckComponent>;

  let commentService: CommentService;
  let stepentriesService: StepEntriesService;
  let bottomSheet: MatBottomSheet;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        OAuthModule.forRoot(),
        NgxSkeletonLoaderModule,
        EmployeeCheckComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(EmployeeCheckComponent);
      component = fixture.componentInstance;

      commentService = TestBed.inject(CommentService);
      stepentriesService = TestBed.inject(StepEntriesService);
      bottomSheet = TestBed.inject(MatBottomSheet);
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#selectionChange - should set all done and call refreshMonthlyReport.emit', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(component.refreshMonthlyReport, 'emit').and.stub();
    spyOn(commentService, 'setStatusDone').and.returnValue(of(null));

    component.monthlyReport = new MonthlyReport();
    component.monthlyReport.comments = CommentsMock.setupComments();

    const change = {
      options: [
        {
          value: CommentsMock.setupComments()[0]
        }
      ]
    };

    component.selectionChange(change as any);
    flush();

    expect(component.refreshMonthlyReport.emit).toHaveBeenCalled();
  }));

  it('#setOpenAndUnassignedStepEntriesDone - should call refreshMonthlyReport.emit', fakeAsync(() => {
    fixture.detectChanges();

    component.monthlyReport = new MonthlyReport();
    component.monthlyReport.employee = EmployeeMock.employee;

    spyOn(component.refreshMonthlyReport, 'emit').and.stub();
    spyOn(stepentriesService, 'close').and.returnValue(of(null));

    component.setOpenAndUnassignedStepEntriesDone();
    flush();

    expect(component.refreshMonthlyReport.emit).toHaveBeenCalled();
  }));

  it('#openEmployeeProgress - should call bottomSheet.open', fakeAsync(() => {
    fixture.detectChanges();

    component.monthlyReport = new MonthlyReport();

    spyOn(bottomSheet, 'open').and.stub();

    component.openEmployeeProgress(undefined);

    expect(bottomSheet.open).toHaveBeenCalled();
  }));

  it('#parseBody - should replace link and add href', () => {
    fixture.detectChanges();

    const replacedString = component.parseBody('https://gepardec.com/info');

    expect(replacedString).toContain('href');
  });

  class CommentsMock {

    static setupComments(): Array<Comment> {
      return [
        {
          id: 1,
          message: 'Hello',
          state: State.DONE,
          authorEmail: 'max.mustermann@gepardec.com',
          updateDate: moment().format(DATE_FORMAT),
          isEditing: true,
          authorName: 'Max Mustermann'
        },
        {
          id: 1,
          message: 'World',
          state: State.DONE,
          authorEmail: 'max.mustermann@gepardec.com',
          updateDate: moment().format(DATE_FORMAT),
          isEditing: true,
          authorName: 'Max Mustermann'
        }
      ];
    }
  }

  class EmployeeMock {
    static employee: Employee = {
      email: 'LIW-Microservices',
      active: true,
      firstname: 'Max',
      lastname: 'Muster',
      releaseDate: '2021-10-01',
      salutation: 'Herr',
      title: 'MSc',
      userId: '011-mmuster',
      workDescription: 'Software-Engineer'
    };
  }
});