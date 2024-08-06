import {HealthEntry} from './HealthEntry';

export interface HealthResponse {
  status: string;
  checks: Array<HealthEntry>;
}
