import {Component} from '@angular/core';
import {StateIndicatorComponent} from "@mega/shared/ui-common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-credit-card-warning',
  templateUrl: './credit-card-warning.component.html',
  styleUrls: ['./credit-card-warning.component.scss'],
  imports: [
    StateIndicatorComponent,
    TranslateModule
  ],
  standalone: true
})
export class CreditCardWarningComponent {

  constructor() { }

}
