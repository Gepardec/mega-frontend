import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../../models/User';
import { Role } from '../../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private router: Router,
              private userService: UserService) {
  }

  isAllowed(path: string) {
    const user: User = this.userService.user.value;

    if (!user) {
      return false;
    }

    const route: Route = this.router.config.find(r => r.path === path);

    if (!route) {
      return false;
    }

    if (route.data) {
      return (route.data.roles as Array<string>).find(role => Role[role] === user.role) !== undefined;
    } else {
      return true;
    }
  }
}
