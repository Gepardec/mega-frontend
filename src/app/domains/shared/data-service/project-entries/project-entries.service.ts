import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';
import {ProjectEntry, ProjectStepQualifier} from '../../../project-management/data-model/ProjectEntry';
import {ProjectState} from '@mega/shared/data-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectEntriesService {

  constructor(private httpClient: HttpClient,
              private config: ConfigService) {
  }

  updateProjectEntry(state: ProjectState, preset: boolean, projectName: string, step: ProjectStepQualifier, currentMonthYear: string): Observable<boolean> {
    return this.httpClient.put<boolean>(
      this.config.getBackendUrlWithContext('/projectentry'),
      new ProjectEntry(state, preset, projectName, step, currentMonthYear)
    );
  }
}
