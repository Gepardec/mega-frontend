import {Component, OnDestroy, OnInit} from '@angular/core';
import {DisplayEmployeeListService} from "./display-employee-list.service";
import {MitarbeiterResponseType} from "../../../models/Mitarbeiter/MitarbeiterResponseType";
import {SocialUser} from "angularx-social-login";
import {AuthenticationService} from "../../../signin/authentication.service";
import {MitarbeiterType} from "../../../models/Mitarbeiter/Mitarbeiter/MitarbeiterType";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-display-employee-list',
  templateUrl: './display-employee-list.component.html',
  styleUrls: ['./display-employee-list.component.scss']
})
export class DisplayEmployeeListComponent implements OnInit, OnDestroy {

  selectedEmployees: Array<MitarbeiterType> = new Array<MitarbeiterType>();

  protected isGridlistActive: boolean = true;

  user: SocialUser;

  employees: MitarbeiterResponseType;

  selectedDate: string = null;

  private currentUserSubscription: Subscription;
  private getEmployeeSubscription: Subscription;
  private selectedEmployeesSubscription: Subscription;
  private updateEmployeesSubscription: Subscription;

  constructor(
    private displayMitarbeiterListeService: DisplayEmployeeListService,
    private authenticationService: AuthenticationService
  ) {
    this.selectedDate = null;
  }

  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe((user: SocialUser) => {
      this.user = user;
      this.getAllEmployees();
    });

    this.selectedEmployeesSubscription = this.displayMitarbeiterListeService.selectedEmployees
      .subscribe((selectedEmployees: Array<MitarbeiterType>) => {
        console.log(selectedEmployees);
        this.selectedEmployees = selectedEmployees;
      });

  }

  ngOnDestroy(): void {
    this.currentUserSubscription && this.currentUserSubscription.unsubscribe();
    this.selectedEmployeesSubscription && this.selectedEmployeesSubscription.unsubscribe();
    this.getEmployeeSubscription && this.getEmployeeSubscription.unsubscribe();
    this.updateEmployeesSubscription && this.updateEmployeesSubscription.unsubscribe();
  }

  toggleView(): void {
    this.isGridlistActive = !this.isGridlistActive;
  }

  releaseEmployees() {
    if (this.selectedDate) {
      this.updateEmployeesSubscription = this.displayMitarbeiterListeService.updateEmployees(this.selectedEmployees, this.selectedDate)
        .subscribe((res) => {
          // refresh employees
          this.employees = null;
          this.getAllEmployees();
        });
    }
  }

  getAllEmployees() {
    if (this.user) {
      this.getEmployeeSubscription = this.displayMitarbeiterListeService.getEmployees(this.user)
        .subscribe((mitarbeiter: MitarbeiterResponseType) => {
          this.employees = mitarbeiter;
        });
    }
  }

  dateChanged(date: string) {
    this.selectedDate = date;
  }

}
