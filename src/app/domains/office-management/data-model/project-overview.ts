import {ProjectComment, ProjectState, State} from "@mega/shared/data-model";

export interface ProjectOverview {
  zepId: number,
  name: string,
  employeesChecked: State,
  controllingState: ProjectState,
  billingState: ProjectState,
  comment: ProjectComment,
}
