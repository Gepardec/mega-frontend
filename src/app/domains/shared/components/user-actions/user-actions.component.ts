import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../models/User';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {UserInfo} from '../../../monthly-report/models/UserInfo';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgIf,
    TranslateModule
  ]
})
export class UserActionsComponent implements OnInit {

  @Input() user: User;
  @Output() logout: EventEmitter<void> = new EventEmitter();
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  pictureUrl: string;

  constructor(private dialog: MatDialog,
              private oAuthService: OAuthService) {
  }

  ngOnInit(): void {
    this.oAuthService.loadUserProfile().then((userInfo: UserInfo) => {
      this.pictureUrl = userInfo?.info?.picture;
    });
  }

  doLogout() {
    this.logout.emit();
  }

  openInfoDialog(): void {
    this.dialog.open(InfoDialogComponent, {minWidth: '50%', autoFocus: false});
  }
}
