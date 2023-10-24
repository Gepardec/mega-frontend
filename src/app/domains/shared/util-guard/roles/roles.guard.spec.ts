import {TestBed, waitForAsync} from '@angular/core/testing';
import {rolesGuard} from './roles.guard';
import {RolesService} from '@mega/shared/data-service';
import {CanActivateFn} from '@angular/router';

describe('rolesGuard', () => {

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => rolesGuard(...guardParameters));

  let rolesService: RolesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: RolesService, useClass: RolesServiceMock}
      ]
    }).compileComponents().then(() => {
      rolesService = TestBed.inject(RolesService);
    });
  }));

  it('#should create', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('#canActivate - should return true', () => {
    spyOn(rolesService, 'isAllowed').and.returnValue(true);

    const canActivate = executeGuard(createMockRoute('localhost:4020'), null);

    expect(rolesService.isAllowed).toHaveBeenCalled();
    expect(canActivate).toBeTrue();
  });

  class RolesServiceMock {
    isAllowed() {
    }
  }

  const createMockRoute = (id: string) => {
    return {
      routeConfig: {path: id}
    } as any;
  };
});
