export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  token: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ValidationError {
  target: Record<string, any>;
  value: string;
  property: string;
  children: any[];
  constraints: Record<string, string>;
}

export interface ErrorResponse {
  error: string;
  details?: ValidationError[];
}

export interface SignInResponse {
  user: User;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}
