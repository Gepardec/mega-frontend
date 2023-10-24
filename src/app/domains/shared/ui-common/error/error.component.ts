import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorService} from '@mega/shared/data-service';
import {configuration} from '@mega/shared/util-constant';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class ErrorComponent implements OnInit {

  errorMessage: string;
  private redirectUrl: string;

  constructor(
    private router: Router,
    private errorService: ErrorService
  ) {
  }

  ngOnInit() {
    this.errorMessage = this.errorService.message;
    this.redirectUrl = this.errorService.redirectUrl;
    this.errorService.removeLastErrorData();
  }

  navigatePreviousPage() {
    if (!this.redirectUrl) {
      this.router.navigate([configuration.PAGE_URLS.MONTHLY_REPORT]);
    } else {
      this.router.navigate([this.redirectUrl]);
    }
  }
}
