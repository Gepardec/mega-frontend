import { User } from './User';

export interface PrematureEmployeeCheck {
  id?: number;
  user: User;
  forMonth: string;
  reason?: string;
  state: string;
}
