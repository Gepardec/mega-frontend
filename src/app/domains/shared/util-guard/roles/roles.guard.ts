import {inject} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {RolesService} from '@mega/shared/data-service';

export const rolesGuard: CanActivateFn = (route): boolean => {
  return inject(RolesService).isAllowed(route.routeConfig.path);
};
