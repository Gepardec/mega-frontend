import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LeadsComponent} from './leads.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {By} from '@angular/platform-browser';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MatCardModule} from '@angular/material/card';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

describe('LeadsComponent', () => {

  let component: LeadsComponent;
  let fixture: ComponentFixture<LeadsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({de: require('src/assets/i18n/de.json')}),
        HttpClientTestingModule,
        MatCardModule,
        NgxSkeletonLoaderModule,
        LeadsComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LeadsComponent);
      component = fixture.componentInstance;
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#afterInit - should display values from monthly report', () => {
    const monthlyReport = new MonthlyReport();

    monthlyReport.guildLead = 'Guild Lead';
    monthlyReport.internalProjectLead = 'Internal Project Lead';

    component.monthlyReport = monthlyReport;

    fixture.detectChanges();

    assertMonthlyReportRow(1, 'Gilden-Lead', 'Guild Lead');
    assertMonthlyReportRow(2, 'Interner Projektleiter', 'Internal Project Lead');

  });

  function assertMonthlyReportRow(rowNumber: number, expectedHeader: string, expectedVal: string) {
    const tr = fixture.debugElement.query(By.css(`.mat-mdc-row:nth-child(${rowNumber})`));

    const header = tr.query(By.css('.mat-column-description')).nativeElement.innerText.trim();
    expect(header).toEqual(expectedHeader.trim());
    const days = tr.query(By.css('.mat-column-value')).nativeElement.innerText.trim();
    expect(days).toEqual(expectedVal.trim());
  }
});
