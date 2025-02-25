import { UserRole } from '../../shared/enums/user-role.enum';
import { UserStatus } from '../../shared/enums/user-status.enum';
export interface User {
  id?: string;
  username: string;
  email: string;
  password?: string;
  phone: string;
  status: UserStatus;
  role: UserRole;
}


export interface AuthResponse {
  data: {
    data: {
      token: string;
      email: string;
      name: string;
      role: number;
    };
    success: boolean;
    message: string;
    errors: string[];
  };
  success: boolean;
  message: string;
  errors: string[];
}
