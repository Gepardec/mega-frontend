import {Component, DestroyRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Employee, State} from "@mega/shared/data-model";
import {BillData} from "../../data-model/BillData";
import {BillService} from "../../../shared/data-service/bill/bill.service";
import {MatCardModule} from "@angular/material/card";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatTableModule} from "@angular/material/table";
import {PaymentMethodType} from "../../../shared/data-model/PaymentMethodType";
import {MatButtonModule} from "@angular/material/button";
import {StateIndicatorComponent} from "@mega/shared/ui-common";
import {BehaviorSubject, combineLatest, distinctUntilChanged, Subject} from "rxjs";
import {MonthlyReportService} from "@mega/monthly-report/data-service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {map} from "rxjs/operators";
import {MatIconModule} from "@angular/material/icon";

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

export class BillsComponent implements OnChanges{
  // to avoid calling REST before employeeId is present
  @Input({required: true})
  employee: Employee;
  bills: Array<BillData>;
  displayedColumns: string[];
  protected readonly PaymentMethodType = PaymentMethodType;

  constructor(private billService: BillService, private destroyRef: DestroyRef, private monthlyReportService: MonthlyReportService) {
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log(changes.employee.currentValue)
    this.bills = null;
    const currentEmployee = changes.employee.currentValue as Employee;
    if(currentEmployee?.userId) {
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
          this.displayedColumns = ['billDate', 'bruttoValue', 'billType', 'paymentMethodType', 'projectName'];
          // adds 'downloadButton' if at least one bill has an attachment
          this.updateDisplayedColumns();
        }
      )
  }

  // only show the button column if there is at least one bill with attachment
  showDownloadButton(): boolean {
    return this.bills.some(bill => bill.attachmentBase64String !== null);
  }

  downloadPDF(bill: BillData) {
    let base64String = bill.attachmentBase64String;

    // check whether we need to prepend the data type or not for pdf
    if (base64String.startsWith("JVB")) {
      base64String = "data:application/pdf;base64," + base64String;
      this.downloadFileObject(base64String, bill.attachmentFileName);
    }
    else if (base64String.startsWith("data:application/pdf;base64")) {
      this.downloadFileObject(base64String, bill.attachmentFileName);
    }
    else {
      alert("Not a valid Base64 PDF string. Please check");
    }
  }

  downloadFileObject(base64String: string, attachmentFilename: string) {
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    // fileName for the pdf
    downloadLink.download = attachmentFilename;
    downloadLink.click();
  }

  updateDisplayedColumns() {
    if (this.showDownloadButton()) {
      if (!this.displayedColumns.includes('downloadButton')) {
        // Add downloadButton column to displayedColumns if it's not already present
        this.displayedColumns.push('downloadButton');
      }
    }
    else {
      if (this.displayedColumns.includes('downloadButton')) {
        // Remove downloadButton column from displayedColumns if it's present
        this.displayedColumns = this.displayedColumns.filter(column => column !== 'downloadButton');
      }
    }
  }


  protected readonly State = State;
}
