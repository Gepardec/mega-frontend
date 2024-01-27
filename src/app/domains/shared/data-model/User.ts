import { Role } from './Role';

export class User {
  dbId: number;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: Role[];
}
