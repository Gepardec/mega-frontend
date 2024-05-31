import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardWarningComponent } from './credit-card-warning.component';

describe('CreditCardWarningComponent', () => {
  let component: CreditCardWarningComponent;
  let fixture: ComponentFixture<CreditCardWarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditCardWarningComponent]
    });
    fixture = TestBed.createComponent(CreditCardWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
