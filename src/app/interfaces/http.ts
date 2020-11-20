import { User } from './user';

export interface Http {
}

export interface LoginResponse {
  token: string;
  user: UserData;
}

export interface ErrorResponse {
  code: string;
  data: ErrorData;
  message: string;
}

export interface Response {
  success: boolean;
  message: string;
  data: any;
}

interface ErrorData {
  status: number;
}

export interface UserData {
  ID: number;
  user_email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  roles: string[];
}
