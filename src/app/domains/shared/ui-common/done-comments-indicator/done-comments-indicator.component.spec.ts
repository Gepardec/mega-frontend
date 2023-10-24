import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DoneCommentsIndicatorComponent} from '@mega/shared/ui-common';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DoneCommentsIndicatorComponent', () => {

  let component: DoneCommentsIndicatorComponent;
  let fixture: ComponentFixture<DoneCommentsIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DoneCommentsIndicatorComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DoneCommentsIndicatorComponent);
      component = fixture.componentInstance;
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });
});
