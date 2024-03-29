import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EmployeeCardComponent} from './employee-card.component';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

describe('OfficeManagementComponent', () => {

  let component: EmployeeCardComponent;
  let fixture: ComponentFixture<EmployeeCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        NgxSkeletonLoaderModule,
        EmployeeCardComponent,
        MatDialogModule,
        MatSnackBarModule,
        MatBottomSheetModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(EmployeeCardComponent);
      component = fixture.componentInstance;
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });
});
