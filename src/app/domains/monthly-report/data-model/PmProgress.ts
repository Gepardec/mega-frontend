import {State} from '@mega/shared/data-model';

export class PmProgress {
  firstname: string;
  lastname: string;
  state: State;
  project: string;
  stepId: number;
  assigneeEmail: string;
}
