import {User} from './User';

export interface PrematureEmployeeCheck {
  user: User;
  forMonth: string;
  reason?: string;
  state: string;
}
