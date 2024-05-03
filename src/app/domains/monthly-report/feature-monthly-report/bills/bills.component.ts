import {Component, DestroyRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Employee, State} from "@mega/shared/data-model";
import {BillService} from "../../../shared/data-service/bill/bill.service";
import {MatCardModule} from "@angular/material/card";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatTableModule} from "@angular/material/table";
import {PaymentMethodType} from "../../../shared/data-model/PaymentMethodType";
import {MatButtonModule} from "@angular/material/button";
import {StateIndicatorComponent} from "@mega/shared/ui-common";
import {MonthlyReportService} from "@mega/monthly-report/data-service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatIconModule} from "@angular/material/icon";
import {BillData} from "../../data-model/BillData";

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
    MatIconModule
  ],
  standalone: true
})

export class BillsComponent implements OnChanges {
  // to avoid calling REST before employeeId is present
  @Input({required: true})
  employee: Employee;
  bills: Array<BillData>;
  displayedColumns: string[];
  protected readonly PaymentMethodType = PaymentMethodType;

  constructor(private billService: BillService, private destroyRef: DestroyRef, private monthlyReportService: MonthlyReportService, private translateService: TranslateService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.employee.currentValue)
    this.bills = null;
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
      .subscribe(resultBillList => {
          this.bills = resultBillList;
          this.displayedColumns = ['billDate', 'bruttoValue', 'billType', 'paymentMethodType', 'projectName', 'downloadButton'];
        }
      )
  }


  downloadPDF(bill: BillData) {
    let base64String = bill.attachmentBase64String;

    // check whether we need to prepend the data type or not for pdf
    if (base64String.startsWith("JVB")) {
      base64String = "data:application/pdf;base64," + base64String;
      this.downloadFileObject(base64String, bill.attachmentFileName);
    } else if (base64String.startsWith("data:application/pdf;base64")) {
      this.downloadFileObject(base64String, bill.attachmentFileName);
    } else {
      this.translateService.get("notifications.errors.noValidBase64").subscribe(alertString =>
        alert(alertString)
      );
    }
  }

  downloadFileObject(base64String: string, attachmentFilename: string) {
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    // fileName for the pdf
    downloadLink.download = attachmentFilename;
    downloadLink.click();
  }

  protected readonly State = State;
}