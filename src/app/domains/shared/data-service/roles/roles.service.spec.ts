import { TestBed } from '@angular/core/testing';

import { RolesService } from './roles.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user/user.service';
import { configuration } from '@mega/shared/util-constant';
import { Role, User } from '@mega/shared/data-model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { routes } from 'src/app/app.routes';

describe('RolesService', () => {

  let rolesService: RolesService;
  let userService: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        {
          provide: UserService, useClass: UserServiceMock
        }
      ]
    });

    rolesService = TestBed.inject(RolesService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  describe('#on common', () => {
    it('#isAllowed - should return false if no user is logged in', () => {
      expect(rolesService.isAllowed(configuration.PAGE_URLS.OFFICE_MANAGEMENT)).toBe(false);
    });

    it('#isAllowed - should return false if route is not found', () => {

      spyOnProperty(userService.user, 'value').and.returnValue({
        dbId: 1,
        userId: '07-johndoe',
        firstname: 'john',
        lastname: 'doe',
        email: 'john.doe@gepardec.com',
        roles: [Role.EMPLOYEE]
      });

      expect(rolesService.isAllowed(configuration.PAGE_URLS.OFFICE_MANAGEMENT + 'somewrongroute')).toBe(false);
    });
  });

  describe('#on employee', () => {
    it('#isAllowed - should return true if user roles are sufficient', () => {

      spyOnProperty(userService.user, 'value').and.returnValue({
        dbId: 1,
        userId: '07-johndoe',
        firstname: 'john',
        lastname: 'doe',
        email: 'john.doe@gepardec.com',
        roles: [Role.EMPLOYEE]
      });

      expect(rolesService.isAllowed(configuration.PAGE_URLS.MONTHLY_REPORT)).toBe(true);
    });

    it('#isAllowed - should return false if user roles are insufficient', () => {

      spyOnProperty(userService.user, 'value').and.returnValue({
        dbId: 1,
        userId: '07-johndoe',
        firstname: 'john',
        lastname: 'doe',
        email: 'john.doe@gepardec.com',
        roles: [Role.EMPLOYEE]
      });

      expect(rolesService.isAllowed(configuration.PAGE_URLS.OFFICE_MANAGEMENT)).toBe(false);
    });
  });

  describe('#on office managment', () => {
    it('#isAllowed - should return true if user roles are sufficient', () => {

      spyOnProperty(userService.user, 'value').and.returnValue(
        {
          dbId: 1,
          userId: '07-johndoe',
          firstname: 'john',
          lastname: 'doe',
          email: 'john.doe@gepardec.com',
          roles: [Role.EMPLOYEE, Role.OFFICE_MANAGEMENT]
        }
      );

      expect(rolesService.isAllowed(configuration.PAGE_URLS.OFFICE_MANAGEMENT)).toBe(true);
    });

    it('#isAllowed - should return false if user roles are sufficient', () => {

      spyOnProperty(userService.user, 'value').and.returnValue({
        dbId: 1,
        userId: '07-johndoe',
        firstname: 'john',
        lastname: 'doe',
        email: 'john.doe@gepardec.com',
        roles: [Role.EMPLOYEE, Role.OFFICE_MANAGEMENT]
      });

      expect(rolesService.isAllowed(configuration.PAGE_URLS.PROJECT_MANAGEMENT)).toBe(false);
    });
  });

  describe('#on project lead', () => {
    it('#isAllowed - should return true if user roles are sufficient', () => {

      spyOnProperty(userService.user, 'value').and.returnValue(
        {
          dbId: 1,
          userId: '07-johndoe',
          firstname: 'john',
          lastname: 'doe',
          email: 'john.doe@gepardec.com',
          roles: [Role.EMPLOYEE, Role.PROJECT_LEAD]
        }
      );

      expect(rolesService.isAllowed(configuration.PAGE_URLS.PROJECT_MANAGEMENT)).toBe(true);
    });

    it('#isAllowed - should return false if user roles are sufficient', () => {
      spyOnProperty(userService.user, 'value').and.returnValue(
        {
          dbId: 1,
          userId: '07-johndoe',
          firstname: 'john',
          lastname: 'doe',
          email: 'john.doe@gepardec.com',
          roles: [Role.EMPLOYEE, Role.PROJECT_LEAD]
        }
      );

      expect(rolesService.isAllowed(configuration.PAGE_URLS.OFFICE_MANAGEMENT)).toBe(false);
    });
  });

  class UserServiceMock {

    user: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);

  }
});
