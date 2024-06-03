import {Component} from '@angular/core';
import {StateIndicatorComponent} from "@mega/shared/ui-common";

@Component({
  selector: 'app-credit-card-warning',
  templateUrl: './credit-card-warning.component.html',
  styleUrls: ['./credit-card-warning.component.scss'],
  imports: [
    StateIndicatorComponent
  ],
  standalone: true
})
export class CreditCardWarningComponent {

  constructor() { }
}
