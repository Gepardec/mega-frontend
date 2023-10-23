import {TestBed, waitForAsync} from '@angular/core/testing';

import {loginGuard} from './login.guard';
import {UserService} from '@mega/shared/data-service';
import {BehaviorSubject} from 'rxjs';
import {User} from '@mega/shared/data-model';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../../../app.routes';
import {CanActivateFn} from '@angular/router';

describe('LoginGuard', () => {

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  let userService: UserService;

  const userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        {provide: UserService, useClass: UserServiceMock}
      ]
    }).compileComponents().then(() => {
      userService = TestBed.inject(UserService);
    });
  }));

  it('#should create', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('#canActivate - should be logged in', () => {
    spyOn(userService, 'loggedInWithGoogle').and.returnValue(true);
    userService.user.next({
      userId: 'test-id',
      email: 'test@gepardec.com',
      firstname: 'test',
      lastname: 'test',
      roles: []
    });

    const canActivate = executeGuard(null, null);

    expect(userService.loggedInWithGoogle).toHaveBeenCalled();
    expect(canActivate).toBeTrue();
  });

  it('#canActivate - should not be logged in', () => {
    spyOn(userService, 'loggedInWithGoogle').and.returnValue(false);
    spyOn(userService, 'setStartpageOverride').and.stub();

    const canActivate = executeGuard(null, createMockStartPage('localhost:4020'));

    expect(userService.loggedInWithGoogle).toHaveBeenCalled();
    expect(canActivate).toBeFalse();
  });

  class UserServiceMock {

    user: BehaviorSubject<User> = userSubject;

    loggedInWithGoogle() {
    }

    setStartpageOverride() {
    }
  }

  const createMockStartPage = (id: string) => {
    return {
      state: {url: id}
    } as any;
  };
});
