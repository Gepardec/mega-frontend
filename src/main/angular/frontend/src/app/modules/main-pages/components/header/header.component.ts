import {Component, OnInit} from '@angular/core';
import {configuration} from "../../../shared/constants/configuration";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  readonly employeePageData = [configuration.PAGE_NAMES.EMPLOYEES, configuration.PAGE_URLS.EMPLOYEES];
  readonly monthlyReportPageData = [configuration.PAGE_NAMES.MONTHLY_REPORT, configuration.PAGE_URLS.MONTHLY_REPORT];
  readonly loginPageUrl = configuration.PAGE_URLS.LOGIN;

  constructor() {
  }

  ngOnInit() {
  }

}
