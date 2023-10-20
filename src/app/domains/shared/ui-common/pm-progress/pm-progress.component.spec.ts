import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PmProgressComponent} from '@mega/shared/ui-common';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {PmProgress} from '../../../monthly-report/data-model/PmProgress';
import {State} from '../../data-model/State';

describe('PmProgressComponent', () => {

  let component: PmProgressComponent;
  let fixture: ComponentFixture<PmProgressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        PmProgressComponent
      ],
      providers: [
        {provide: MAT_BOTTOM_SHEET_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(PmProgressComponent);
      component = fixture.componentInstance;
      component.pmProgresses = [];
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#afterInit - should set displayedEmployees with correct state', () => {
    component.pmProgresses = PmProgressMock.pmProgresses;
    component.internalCheckState = State.OPEN;

    component.ngOnInit();

    expect(component.displayedEmployees.every(employee => {
        console.warn(employee);
        return employee.state === State.OPEN;
      }
    )).toBeTrue();
  });

  class PmProgressMock {

    static pmProgresses: Array<PmProgress> = [];

    constructor() {
      const pmProgress1 = new PmProgress();
      pmProgress1.firstname = 'Max';
      pmProgress1.lastname = 'Müller';
      pmProgress1.state = State.OPEN;
      pmProgress1.project = 'LIW-Allgemein';
      pmProgress1.stepId = 1;
      pmProgress1.assigneeEmail = 'max.mueller@gepardec.com';

      const pmProgress2 = new PmProgress();
      pmProgress2.firstname = 'Susi';
      pmProgress2.lastname = 'Maier';
      pmProgress2.state = State.OPEN;
      pmProgress2.project = 'LIW-Allgemein';
      pmProgress2.stepId = 1;
      pmProgress2.assigneeEmail = 'susi.maier@gepardec.com';

      PmProgressMock.pmProgresses.push(pmProgress1, pmProgress2);
    }
  }
});
