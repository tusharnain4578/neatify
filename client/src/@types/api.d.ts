type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

type ApiErrorResponse = {
  message: string;
  errors: Record<string, string[]>;
};

type ApiPaginatedDataResponse<T> = {
  success: boolean;
  data: {
    data: T[];
  };
};

// User Register
type UserRegisterRequest = {
  name: string;
  email: string;
  password: string;
};
type UserRegisterResponse = ApiResponse<IUser>;

// User Login
type UserLoginRequest = { email: string; password: string };
type UserLoginResponse = ApiResponse<{ user: IUser; token: string }>;

// Create Project
type CreateProjectRequest = {
  title: string;
  description?: string;
  status: number;
};
type CreateProjectResponse = ApiResponse<IProject>;
