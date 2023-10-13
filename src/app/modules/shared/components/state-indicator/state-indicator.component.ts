import {Component, Input} from '@angular/core';
import {State} from '../../models/State';
import {ProjectState} from '../../models/ProjectState';
import {MatIconModule} from '@angular/material/icon';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

@Component({
  selector: 'app-state-indicator',
  templateUrl: './state-indicator.component.html',
  styleUrls: ['./state-indicator.component.scss'],
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    MatIconModule,
    NgSwitchDefault
  ]
})
export class StateIndicatorComponent {

  State = State;
  ProjectState = ProjectState;

  @Input() state: string;
  @Input() size: 'small' | 'medium' | 'large' = 'small';
}
