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

type ApiSingleDataResponse<T> = {
  success: boolean;
  data: T;
};

// User Register
interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}
type UserRegisterResponse = ApiResponse<IUser>;

// User Login
type UserLoginRequest = { email: string; password: string };
type UserLoginResponse = ApiResponse<{ user: IUser; token: string }>;

// Create Project
interface CreateProjectRequest {
  title: string;
  description?: string;
  type: number;
  status: number;
}
type CreateProjectResponse = ApiResponse<IProject>;

// Update Project
interface UpdateProjectRequest extends CreateProjectRequest {
  id: number;
}
type UpdateProjectResponse = CreateProjectResponse;
