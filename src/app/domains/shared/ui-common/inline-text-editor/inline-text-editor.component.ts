import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild
} from '@angular/core';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-inline-text-editor',
  templateUrl: './inline-text-editor.component.html',
  styleUrls: ['./inline-text-editor.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class InlineTextEditorComponent implements AfterViewInit {

  @Input() comment: string
  @Output() commentChange = new EventEmitter<string>();
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('textarea') textarea: ElementRef;

  MAXIMUM_LETTERS = 500;

  constructor(private _ngZone: NgZone,
              private changeDectectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.textarea.nativeElement.focus();
    this.triggerResize();
    this.changeDectectorRef.detectChanges();
  }

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => {
        this.autosize.resizeToFitContent(true);
      });
  }

  onCancel(event, inputElement: HTMLTextAreaElement) {
    if (!event.relatedTarget || event.relatedTarget.id !== 'savebutton') {
      this.commentChange.emit(this.comment);
    } else {
      this.onSave(inputElement);
    }
  }

  onSave(inputElement: HTMLTextAreaElement) {
    this.commentChange.emit(inputElement.value.trim());
  }
}
