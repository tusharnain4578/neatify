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
