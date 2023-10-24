import {Component, OnInit} from '@angular/core';
import {ProjectManagementService} from '@mega/project-management/data-service';
import {finalize} from 'rxjs';
import {CustomerProjectWithoutLeads} from '@mega/shared/data-model';
import {TranslateModule} from '@ngx-translate/core';
import {ProjektNameWithZepLinkComponent} from '@mega/office-management/ui-common';
import {MatTableModule} from '@angular/material/table';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {StateIndicatorComponent} from '@mega/shared/ui-common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-projects-without-leads-card',
  templateUrl: './projects-without-leads-card.component.html',
  styleUrls: ['./projects-without-leads-card.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatTooltipModule,
    StateIndicatorComponent,
    NgxSkeletonLoaderModule,
    MatTableModule,
    ProjektNameWithZepLinkComponent,
    TranslateModule
  ]
})
export class ProjectsWithoutLeadsCardComponent implements OnInit {

  constructor(private pmService: ProjectManagementService) {
  }

  public projectsWithoutLeads: CustomerProjectWithoutLeads[];
  public loaded = false;
  public displayedColumns = ['name', 'comment'];

  ngOnInit(): void {
    this.pmService.getProjectsWithoutLeads()
      .pipe(
        finalize(() => this.loaded = true)
      )
      .subscribe(projects => this.projectsWithoutLeads = projects);
  }
}
