import {Component} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {UserService} from '@mega/shared/data-service';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class LoginComponent {

  constructor(private oAuthService: OAuthService,
              private userService: UserService) {
  }

  login(): void {
    this.oAuthService.initLoginFlow();
  }

  loggedIn(): boolean {
    return this.userService.loggedInWithGoogle();
  }
}
