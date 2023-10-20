import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '@mega/shared/data-service';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../data-model/User';
import {Link} from '../../data-model/Link';
import {RolesService} from '@mega/shared/data-service';
import {TranslateService} from '@ngx-translate/core';
import {configuration} from '@mega/shared/util-constant';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {ConfigService} from '@mega/shared/data-service';
import {Config} from '../../data-model/Config';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UserActionsComponent} from '../user-actions/user-actions.component';
import {MatListModule} from '@angular/material/list';
import {NgFor, NgIf} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatSidenavModule,
    NgIf,
    MatListModule,
    UserActionsComponent,
    NgFor,
    RouterLinkActive,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    RouterOutlet
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  readonly links = new Array<Link>();
  readonly assetsPath = '../../../../../assets/';
  readonly logoMega = 'logo-MEGA.png';
  readonly zepLogo = 'zep-eye.png';

  user: User;
  zepUrl: string;
  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  private userSubscription: Subscription;

  constructor(private rolesService: RolesService,
              private userService: UserService,
              private translate: TranslateService,
              private breakpointObserver: BreakpointObserver,
              private configService: ConfigService) {
    translate.get('PAGE_NAMES').subscribe(PAGE_NAMES => {
      this.links.push({name: PAGE_NAMES.MONTHLY_REPORT, path: configuration.PAGE_URLS.MONTHLY_REPORT});
      this.links.push({name: PAGE_NAMES.OFFICE_MANAGEMENT, path: configuration.PAGE_URLS.OFFICE_MANAGEMENT});
      this.links.push({name: PAGE_NAMES.PROJECT_MANAGEMENT, path: configuration.PAGE_URLS.PROJECT_MANAGEMENT});
    });
  }

  ngOnInit() {
    this.userSubscription = this.userService.user.subscribe((user) => {
      this.user = user;
    });
    this.configService.getConfig().subscribe((config: Config) => {
      this.zepUrl = config.zepOrigin;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  showLink(link: Link): boolean {
    return this.rolesService.isAllowed(link.path);
  }

  onLogout(): void {
    this.userService.logout();
  }
}
