import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "@mega/shared/data-service";
import {Employee, User} from "@mega/shared/data-model";
import {BillData} from "../../data-model/BillData";
import {BillService} from "../../../shared/data-service/bill/bill.service";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
  standalone: true
})
export class BillsComponent {

  @Input({required: true}) employee: Employee;
  bills: Array<BillData>;

  constructor(private billService: BillService) {
  }

    getBillsForEmployee(): void {
      this.billService
        .getBillsForEmployee(this.employee.userId)
        .subscribe(resultBillList => {
          this.bills = resultBillList;
        }
      )
    }

}
