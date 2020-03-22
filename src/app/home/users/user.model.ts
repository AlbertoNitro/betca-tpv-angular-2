export interface User {
  mobile: string;
  username: string;
  email?: string;
  dni?: string;
  address?: string;
  registrationDate?: Date;
  active?: boolean;
  role?: string[];
}
