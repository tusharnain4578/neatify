export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type ApiErrorResponse = {
  message: string;
  errors: Record<string, string[]>;
};

export type UserRegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type UserRegisterResponse = ApiResponse<IUser>;

export type UserLoginRequest = { email: string; password: string };

export type UserLoginResponse = ApiResponse<{ user: IUser; token: string }>;
