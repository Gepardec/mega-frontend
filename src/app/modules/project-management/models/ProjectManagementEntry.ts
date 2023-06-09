import {ManagementEntry} from '../../shared/models/ManagementEntry';
import {ProjectState} from '../../shared/models/ProjectState';
import {ProjectComment} from '../../shared/models/ProjectComment';


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
