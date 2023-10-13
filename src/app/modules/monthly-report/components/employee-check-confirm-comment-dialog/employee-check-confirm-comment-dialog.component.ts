import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {
  EmployeeCheckConfirmDialogAction,
  EmployeeCheckConfirmDialogActionType
} from './model/EmployeeCheckConfirmDialogAction';
import {EmployeeCheckConfirmDialogData} from './model/EmployeeCheckConfirmDialogData';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-employee-check-confirm-comment-dialog',
  templateUrl: './employee-check-confirm-comment-dialog.component.html',
  styleUrls: ['./employee-check-confirm-comment-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    NgIf,
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class EmployeeCheckConfirmCommentDialogComponent implements OnInit {
  textAreaInp;

  isEdit;
  MAX_LENGTH = 500;

  constructor(private dialogRef: MatDialogRef<EmployeeCheckConfirmCommentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EmployeeCheckConfirmDialogData) {
  }

  ngOnInit(): void {
    this.textAreaInp = this.data?.reason || '';

    // if reason not empty -> isEdit true
    this.isEdit = !!this.data?.reason;
  }

  save() {
    const result: EmployeeCheckConfirmDialogAction = {
      type: EmployeeCheckConfirmDialogActionType.SAVE,
      payload: this.textAreaInp
    }

    this.dialogRef.close(result);
  }

  cancel() {
    const result: EmployeeCheckConfirmDialogAction = {
      type: EmployeeCheckConfirmDialogActionType.CANCEL,
      payload: null
    }

    this.dialogRef.close(result);
  }
}
