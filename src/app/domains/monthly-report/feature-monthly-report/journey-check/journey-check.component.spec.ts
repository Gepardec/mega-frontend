import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {JourneyCheckComponent} from './journey-check.component';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

describe('JourneyCheckComponent', () => {
  let component: JourneyCheckComponent;
  let fixture: ComponentFixture<JourneyCheckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        NgxSkeletonLoaderModule,
        JourneyCheckComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(JourneyCheckComponent);
      component = fixture.componentInstance;
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getJourneyWarningString - should set warnings', () => {
    fixture.detectChanges();

    const warnings: string = component.getJourneyWarningString(WarningsMock.warnings);

    WarningsMock.warnings.forEach(warning => {
      expect(warnings).toContain(warning);
    })
  });

  class WarningsMock {
    static warnings: Array<string> = ['do', 'something'];
  }
});
