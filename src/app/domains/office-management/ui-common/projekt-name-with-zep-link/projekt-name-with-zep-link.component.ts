import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Config} from '@mega/shared/data-model';
import {ConfigService} from '@mega/shared/data-service';
import {configuration} from '@mega/shared/util-constant';
import {Subscription} from 'rxjs';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-projekt-name-with-zep-link',
  templateUrl: './projekt-name-with-zep-link.component.html',
  styleUrls: ['./projekt-name-with-zep-link.component.scss'],
  standalone: true,
  imports: [
    MatTooltipModule,
    NgIf,
    TranslateModule
  ]
})
export class ProjektNameWithZepLinkComponent implements OnInit, OnDestroy {
  @Input() projectName: string;
  @Input() zepId: number;

  projectManagementUrl: string;
  private configServiceSubscription: Subscription;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configServiceSubscription = this.configService.getConfig().subscribe((config: Config) => {
      this.projectManagementUrl = config.zepOrigin + '/' + configuration.PROJECT_MANAGEMENT_SEGMENT;
    });
  }

  ngOnDestroy(): void {
    this.configServiceSubscription.unsubscribe();
  }

}
