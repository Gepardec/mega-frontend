import {ManagementEntry, ProjectComment, ProjectState} from '@mega/shared/data-model';


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
