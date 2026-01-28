import {Component} from '@angular/core';
import {ConfigService} from '@mega/shared/data-service';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-monthly-report',
  templateUrl: './feature-monthly-report.component.html',
  styleUrls: ['./feature-monthly-report.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule
  ]
})
export class FeatureMonthlyReportComponent {

  constructor(
    private configService: ConfigService) {
  }

  onClickNewDashboard() {
    window.open(this.configService.getNewFrontendUrl(), '_blank');
  }
}
