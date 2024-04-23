import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "@mega/shared/data-model";
import {BillData} from "../../data-model/BillData";
import {BillService} from "../../../shared/data-service/bill/bill.service";
import {MatCardModule} from "@angular/material/card";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatTableModule} from "@angular/material/table";
import {PaymentMethodType} from "../../../shared/data-model/PaymentMethodType";
import {MatButtonModule} from "@angular/material/button";

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
    MatButtonModule
  ],
  standalone: true
})

export class BillsComponent implements OnInit {
  // to avoid calling REST before employeeId is present
  private _employee: Employee;
  bills: Array<BillData>;
  displayedColumns: string[];
  protected readonly PaymentMethodType = PaymentMethodType;

  constructor(private billService: BillService) {
  }

  @Input()
  set employee(value: Employee) {
    this._employee = value;
    if (this._employee && this._employee.userId) {
      this.getBillsForEmployee();
    }
  }

  get employee(): Employee {
    return this._employee;
  }

  ngOnInit(): void {
    if (this.employee && this.employee.userId) {
      this.getBillsForEmployee();
    }
  }

  getBillsForEmployee(): void {
    this.billService
      .getBillsForEmployee(this.employee.userId)
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

  downloadPDF(attachmentBase64String: string) {
    let base64String = attachmentBase64String;

    // check whether we need to prepend the data type or not for pdf
    if (attachmentBase64String.startsWith("JVB")) {
      base64String = "data:application/pdf;base64," + base64String;
      this.downloadFileObject(base64String);
    } else if (base64String.startsWith("data:application/pdf;base64")) {
      this.downloadFileObject(base64String);
    } else {
      alert("Not a valid Base64 PDF string. Please check");
    }

  }

  downloadFileObject(base64String: string) {
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    // fileName
    downloadLink.download = "RechnungAlsPdf.pdf";
    downloadLink.click();
  }

  updateDisplayedColumns() {
    if (this.showDownloadButton()) {
      if (!this.displayedColumns.includes('downloadButton')) {
        // Add downloadButton column to displayedColumns if it's not already present
        this.displayedColumns.push('downloadButton');
      }
    } else {
      if (this.displayedColumns.includes('downloadButton')) {
        // Remove downloadButton column from displayedColumns if it's present
        this.displayedColumns = this.displayedColumns.filter(column => column !== 'downloadButton');
      }
    }
  }


}
