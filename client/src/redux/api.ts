import {
  createApi,
  fetchBaseQuery,
  EndpointBuilder,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import endpoints, { API_BASE_URL, methods } from '../constants/endpoints';
import {
  ApiResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserRegisterRequest,
  UserRegisterResponse,
} from '../@types/api';
import { RootState } from './store';

type MyBaseQueryFn = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.token || localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder: EndpointBuilder<MyBaseQueryFn, string, 'api'>) => ({
    // Register request
    register: builder.mutation<UserRegisterResponse, UserRegisterRequest>({
      query: (data) => ({
        url: endpoints.auth.register,
        method: methods.POST,
        body: data,
      }),
    }),
    // Login request
    login: builder.mutation<UserLoginResponse, UserLoginRequest>({
      query: (data) => ({
        url: endpoints.auth.login,
        method: methods.POST,
        body: data,
      }),
    }),
    // Logout request
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({ url: endpoints.auth.logout, method: methods.POST }),
    }),
    // Authentication check request
    authCheck: builder.mutation<ApiResponse<{ user: IUser }>, void>({
      query: () => ({ url: endpoints.auth.me, method: methods.POST }),
    }),
  }),
});

export default api;
