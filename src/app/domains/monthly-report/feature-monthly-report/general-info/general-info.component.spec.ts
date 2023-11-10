import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GeneralInfoComponent} from './general-info.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {By} from '@angular/platform-browser';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {MatCardModule} from '@angular/material/card';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

describe('GeneralInfoComponent', () => {

  let component: GeneralInfoComponent;
  let fixture: ComponentFixture<GeneralInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({de: require('src/assets/i18n/de.json')}),
        HttpClientTestingModule,
        MatCardModule,
        NgxSkeletonLoaderModule,
        GeneralInfoComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GeneralInfoComponent);
      component = fixture.componentInstance;
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#afterInit - should display values from monthly report', () => {
    const monthlyReport = new MonthlyReport();

    monthlyReport.homeofficeDays = 10;
    monthlyReport.vacationDays = 3;
    monthlyReport.compensatoryDays = 2;
    monthlyReport.totalWorkingTime = '08:00';
    monthlyReport.billableTime = '04:00';

    component.monthlyReport = monthlyReport;

    fixture.detectChanges();

    assertMonthlyReportRow(5, 'Konsumierter Urlaub', '3', 'Tage');
    assertMonthlyReportRow(6, 'Konsumierter Zeitausgleich', '2', 'Tage');
    assertMonthlyReportRow(7, 'Homeoffice', '10', 'Tage');

  });

  it('#afterInit - should display values from monthly report with one day', () => {
    const monthlyReport = new MonthlyReport();

    monthlyReport.homeofficeDays = 1;
    monthlyReport.vacationDays = 1;
    monthlyReport.compensatoryDays = 1;
    monthlyReport.totalWorkingTime = '08:00';
    monthlyReport.billableTime = '04:00';

    component.monthlyReport = monthlyReport;

    fixture.detectChanges();

    assertMonthlyReportRow(5, 'Konsumierter Urlaub', '1', 'Tag');
    assertMonthlyReportRow(6, 'Konsumierter Zeitausgleich', '1', 'Tag');
    assertMonthlyReportRow(7, 'Homeoffice', '1', 'Tag');
  });

  it('#afterInit - should display working times and chargeability ', () => {
    const monthlyReport = new MonthlyReport();

    monthlyReport.totalWorkingTime = '80:00';
    monthlyReport.overtime = 10;
    monthlyReport.billableTime = '60:00';

    component.monthlyReport = monthlyReport;
    component.calculateDynamicValue();

    fixture.detectChanges();

    assertMonthlyReportRow(1, 'Gesamte Arbeitszeit', '80,00', 'Stunden');
    assertMonthlyReportRow(2, 'Überstunden in diesem Monat', '10,00', 'Stunden');
    assertMonthlyReportRow(3, 'Fakturierbare Stunden', '60,00', 'Stunden');
    assertMonthlyReportRow(4, 'Chargeability', '75,00', '%');
  });

  it('#calculateBillingPercentage - should return 0', () => {
    fixture.detectChanges();

    const totalWorkingTime = '8000';
    const billableTime = '600';

    const billingPercentage = component.calculateBillingPercentage(totalWorkingTime, billableTime);

    expect(billingPercentage).toEqual(0);
  });

  function assertMonthlyReportRow(rowNumber: number, expectedHeader: string, expectedDays: string, expectedIdentifier: string) {
    const tr = fixture.debugElement.query(By.css(`.mat-mdc-row:nth-child(${rowNumber})`));

    const header = tr.query(By.css('.mat-column-description')).nativeElement.innerText.trim();
    expect(header).toEqual(expectedHeader.trim());
    const days = tr.query(By.css('.mat-column-value')).nativeElement.innerText.trim();
    expect(days).toEqual(expectedDays.trim());
    const identifier = tr.query(By.css('.mat-column-unit')).nativeElement.innerText.trim();
    expect(identifier).toEqual(expectedIdentifier.trim());
  }
});
