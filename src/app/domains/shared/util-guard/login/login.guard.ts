import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {UserService} from '@mega/shared/data-service';
import {configuration} from '@mega/shared/util-constant';

export const loginGuard: CanActivateFn = (route, state): boolean => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (userService.loggedInWithGoogle() && userService.user.value) {
    return true;
  } else {
    userService.setStartpageOverride(state.url);
    router.navigate([configuration.PAGE_URLS.LOGIN]);
    return false;
  }
};
