import {Component, OnInit} from '@angular/core';
import {InfoService} from '../../services/info/info.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  standalone: true,
  imports: [
    NgIf
  ]
})
export class InfoComponent implements OnInit {

  version: string;

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.infoService.getInfo().subscribe(info => this.version = info.version);
  }
}
