import {Component, DestroyRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Employee, State} from "@mega/shared/data-model";
import {BillService} from "../../../shared/data-service/bill/bill.service";
import {MatCardModule} from "@angular/material/card";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {CurrencyPipe, DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {StateIndicatorComponent} from "@mega/shared/ui-common";
import {MonthlyReportService} from "@mega/monthly-report/data-service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatIconModule} from "@angular/material/icon";
import {MonthlyBillInfoData} from "../../data-model/MonthlyBillInfoData";
import {BillInfoData} from "../../data-model/BillInfoData";
import {CreditCardWarningComponent} from "./credit-card-warning/credit-card-warning.component";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
  imports: [
    MatCardModule,
    NgIf,
    NgxSkeletonLoaderModule,
    TranslateModule,
    MatTableModule,
    CurrencyPipe,
    DatePipe,
    MatButtonModule,
    StateIndicatorComponent,
    MatIconModule,
    DecimalPipe,
    CreditCardWarningComponent
  ],
  standalone: true
})

export class BillsComponent implements OnChanges {
  // to avoid calling REST before employeeId is present
  @Input({required: true})
  employee: Employee;
  billInfo: MonthlyBillInfoData;
  displayedColumns = ['description', 'icon', 'value'];

  constructor(private billService: BillService, private destroyRef: DestroyRef, private monthlyReportService: MonthlyReportService, private translateService: TranslateService) {
    this.billInfo = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.billInfo = null;
    const currentEmployee = changes.employee.currentValue as Employee;
    if (currentEmployee?.userId) {
      this.getBillsForEmployee(currentEmployee.userId, this.monthlyReportService.selectedYear.getValue(), this.monthlyReportService.selectedMonth.getValue());
    }
  }

  getBillsForEmployee(employeeId: string, year: number, month: number): void {
    this.billService
      .getBillsForEmployee(employeeId, year, month)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(monthlyBillInfo => {
          this.billInfo = monthlyBillInfo;
          console.log(this.billInfo.employeeHasCreditCard)
        }
      )
  }

  toBillsData(billInfo: MonthlyBillInfoData): BillInfoData[] {
    const icon = billInfo.hasAttachmentWarnings ? 'warning' : null;
    return [
      { description: 'Zep Einträge mit Beleg', icon: icon, value: billInfo.sumBills.toString() },
      { description: 'davon Privat / Firma',  icon: null, value: `${billInfo.sumPrivateBills} / ${billInfo.sumCompanyBills}`, }
    ];
  }

  protected readonly State = State;
}
