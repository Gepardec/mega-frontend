import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ThirdPartyServiceErrorComponent} from './third-party-service-error.component';

describe('ThirdPartyServiceErrorComponent', () => {
  let component: ThirdPartyServiceErrorComponent;
  let fixture: ComponentFixture<ThirdPartyServiceErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdPartyServiceErrorComponent]
    });
    fixture = TestBed.createComponent(ThirdPartyServiceErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
