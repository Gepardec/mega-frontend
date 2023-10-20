import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '@mega/shared/data-service';
import {configuration} from '@mega/shared/util-constant';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.loggedInWithGoogle() && this.userService.user.value) {
      return true;
    } else {
      this.userService.setStartpageOverride(state.url);
      this.router.navigate([configuration.PAGE_URLS.LOGIN]);
      return false;
    }
  }

}
