export type Role = 'ADMIN' | 'CUSTOMER';

export interface User {
  id?: number; 
  username: string;
  email: string;
  password?: string; 
  role: Role;
  createdAt?: string;
}
