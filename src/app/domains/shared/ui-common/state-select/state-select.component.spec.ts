import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {StateSelectComponent} from '@mega/shared/ui-common';
import {TranslateModule} from '@ngx-translate/core';
import {By} from '@angular/platform-browser';
import {MatSelect} from '@angular/material/select';
import {State} from '@mega/shared/data-model';

describe('StateSelectComponent', () => {

  let fixture: ComponentFixture<StateSelectComponent>;
  let component: StateSelectComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        StateSelectComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(StateSelectComponent);
      component = fixture.componentInstance;
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#afterViewChecked - should have called cdr.detectChanges()', () => {
    fixture.detectChanges();

    const spy = spyOn((component as any).cdr, 'detectChanges');
    component.ngAfterViewChecked();

    expect(spy).toHaveBeenCalled();
  });

  it('#onSelectionChange - should change value', () => {
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.directive(MatSelect));
    select.triggerEventHandler('selectionChange', {value: State.DONE});

    fixture.detectChanges();
    expect(component.value).toEqual(State.DONE);
  })
});
