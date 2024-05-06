import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {MatTableModule} from '@angular/material/table';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {LeadsData} from '../../data-model/LeadsData';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgxSkeletonLoaderModule,
    MatTableModule,
  ]
})
export class LeadsComponent implements OnChanges {

  @Input() monthlyReport: MonthlyReport;

  displayedColumns = ['description', 'value'];


  toLeadsData(): LeadsData[] {
    return [
      {
        description: 'Gilden-Lead',
        value: this.monthlyReport.guildLead
      },
      {
        description: 'Interner Projektleiter',
        value: this.monthlyReport.internalProjectLead
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.monthlyReport) {
      this.setDefaultValues();
    }
  }
  setDefaultValues(): void {
    if (this.monthlyReport) {
      this.monthlyReport.guildLead = this.leadOrDefault(this.monthlyReport.guildLead);
      this.monthlyReport.internalProjectLead = this.leadOrDefault(this.monthlyReport.internalProjectLead);
    }
  }

  leadOrDefault(lead: string): string {
    return lead == null ? 'nicht vorhanden' : lead;
  }
}
