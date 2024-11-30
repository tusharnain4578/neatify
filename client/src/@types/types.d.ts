interface IUser {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: IUser | null;
  token: string | null;
}

interface IBreadcrumb {
  name: string;
  to: string;
  current: boolean;
}

interface IProjectType {
  id: number;
  name: string;
  label: string;
}

interface IProjectStatus {
  id: number;
  name: string;
  label: string;
}

interface IProject {
  id: number;
  title: string;
  description?: string;
  status: IProjectStatus;
  type: IProjectType;
  typeLabel: string;
}

type ReactSelectedOption = {
  value: number;
  label: string;
};

type SelectOption = {
  id: number;
  label: string;
};
