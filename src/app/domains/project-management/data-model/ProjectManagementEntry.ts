import {ManagementEntry} from '../../shared/data-model/ManagementEntry';
import {ProjectState} from '../../shared/data-model/ProjectState';
import {ProjectComment} from '../../shared/data-model/ProjectComment';


export class ProjectManagementEntry {
  zepId?: number;
  projectName: string;
  entries: Array<ManagementEntry>;
  controlProjectState: ProjectState;
  controlBillingState: ProjectState;
  presetControlProjectState: boolean;
  presetControlBillingState: boolean;
  projectComment: ProjectComment;
  aggregatedBillableWorkTimeInSeconds: number;
  aggregatedNonBillableWorkTimeInSeconds: number;
}
