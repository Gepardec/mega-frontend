import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-third-party-service-error',
  templateUrl: './third-party-service-error.component.html',
  styleUrls: ['./third-party-service-error.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule
  ]
})
export class ThirdPartyServiceErrorComponent {

}
