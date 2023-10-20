import {ManagementEntry} from '@mega/shared/data-model';
import {ProjectState} from '@mega/shared/data-model';
import {ProjectComment} from '@mega/shared/data-model';


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
