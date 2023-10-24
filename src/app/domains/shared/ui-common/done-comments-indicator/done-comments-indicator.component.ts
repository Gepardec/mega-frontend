import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-done-comments-indicator',
  templateUrl: './done-comments-indicator.component.html',
  styleUrls: ['./done-comments-indicator.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ]
})
export class DoneCommentsIndicatorComponent {

  @Input() totalComments: number;
  @Input() finishedComments: number;

}
