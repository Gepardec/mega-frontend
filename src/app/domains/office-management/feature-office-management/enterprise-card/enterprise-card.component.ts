import {Component, OnDestroy, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {Moment} from 'moment';
import {Subscription, switchMap, zip} from 'rxjs';
import {EnterpriseEntriesService, OfficeManagementService} from '@mega/office-management/data-service';
import {tap} from 'rxjs/operators';
import {MatSelectChange} from '@angular/material/select';
import {Config} from '@mega/shared/data-model';
import {configuration} from '@mega/shared/util-constant';
import {ConfigService} from '@mega/shared/data-service';
import {EnterpriseEntry, EnterpriseStep} from '@mega/office-management/data-model';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ProjectStateSelectComponent} from '@mega/shared/ui-common';
import {MatTooltipModule, TooltipPosition} from '@angular/material/tooltip';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

const moment = _moment;

@Component({
  selector: 'app-enterprise-card',
  templateUrl: './enterprise-card.component.html',
  styleUrls: ['./enterprise-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgxSkeletonLoaderModule,
    MatTooltipModule,
    ProjectStateSelectComponent,
    TranslateModule
  ]
})
export class EnterpriseCardComponent implements OnInit, OnDestroy {

  EnterpriseStep = EnterpriseStep;

  selectedYear: number;
  selectedMonth: number;

  dateSelectionSub: Subscription;
  officeManagementUrl: string;
  enterpriseEntry: EnterpriseEntry;
  fetchingData: boolean;

  tooltipShowDelay = 500;
  tooltipPosition = 'above' as TooltipPosition;

  constructor(private configService: ConfigService,
              private omService: OfficeManagementService,
              private eeService: EnterpriseEntriesService,
              private _snackBar: MatSnackBar,
              private translate: TranslateService) {
  }

  get date() {
    return moment()
      .year(this.selectedYear)
      .month(this.selectedMonth)
      .date(1)
      .startOf('day');
  }

  ngOnInit(): void {
    this.configService.getConfig().subscribe((config: Config) => {
      this.officeManagementUrl = config.zepOrigin + '/' + configuration.OFFICE_MANAGEMENT_SEGMENT;
    });
    this.dateSelectionSub = zip(this.omService.selectedYear, this.omService.selectedMonth)
      .pipe(
        tap(value => {
          this.selectedYear = value[0];
          this.selectedMonth = value[1];
        }),
        tap(() => {
          this.enterpriseEntry = null;
          this.fetchingData = true;
        }),
        switchMap(() => this.getEnterpriseEntry())
      ).subscribe(enterpriseEntry => {
        this.enterpriseEntry = enterpriseEntry;
        this.fetchingData = false;
      });
  }

  ngOnDestroy(): void {
    this.dateSelectionSub?.unsubscribe();
  }

  dateChanged(date: Moment) {
    this.omService.selectedYear.next(moment(date).year());
    this.omService.selectedMonth.next(moment(date).month() + 1);
  }

  onChangeEnterpriseState($event: MatSelectChange, step: EnterpriseStep, projectStateSelect: ProjectStateSelectComponent) {
    let oldValue = this.enterpriseEntry[step];

    this.enterpriseEntry[step] = $event.value;
    this.eeService.updateEnterpriseEntry(this.enterpriseEntry, this.selectedYear, this.selectedMonth)
      .subscribe((success) => {
        if (!success) {
          this.showErrorSnackbar();
          this.enterpriseEntry[step] = oldValue;
          projectStateSelect.value = this.enterpriseEntry[step];
        }
      });
  }

  private getEnterpriseEntry() {
    return this.eeService.getEnterpriseEntry(this.selectedYear, this.selectedMonth);
  }

  private showErrorSnackbar() {
    this._snackBar.open(
      this.translate.instant('snackbar.message'),
      this.translate.instant('snackbar.confirm'),
      {
        horizontalPosition: <MatSnackBarHorizontalPosition>configuration.snackbar.horizontalPosition,
        verticalPosition: <MatSnackBarVerticalPosition>configuration.snackbar.verticalPosition,
        duration: configuration.snackbar.duration
      });
  }
}
