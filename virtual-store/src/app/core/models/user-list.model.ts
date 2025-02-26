export interface UserListResponse {
  data: {
    data: UserResponse[];
    success: boolean;
    message: string;
    errors: string[];
  };
  success: boolean;
  message: string;
  errors: string[];
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}
