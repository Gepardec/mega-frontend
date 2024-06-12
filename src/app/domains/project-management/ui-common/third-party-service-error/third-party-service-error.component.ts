import {Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {NgClass} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-third-party-service-error',
  templateUrl: './third-party-service-error.component.html',
  styleUrls: ['./third-party-service-error.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    NgClass,
    TranslateModule
  ]
})
export class ThirdPartyServiceErrorComponent {
  @Input() extraClasses: string

}
