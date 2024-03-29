import {Component, OnInit} from '@angular/core';
import {AppInfo} from '@mega/shared/data-model';
import {InfoService} from '@mega/shared/data-service';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class InfoDialogComponent implements OnInit {

  info: AppInfo;

  constructor(private infoService: InfoService) {
  }

  ngOnInit(): void {
    this.infoService.getInfo().subscribe(info => this.info = info);
  }
}
