import {User} from './User';

export class PrematureEmployeeCheck {
  user: User;
  forMonth: string;

  constructor(user: User, forMonth: string) {
    this.user = user;
    this.forMonth = forMonth;
  }
}
