import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {RolesService} from '../data-service/roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard {

  constructor(private rolesService: RolesService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.rolesService.isAllowed(route.routeConfig.path);
  }
}
