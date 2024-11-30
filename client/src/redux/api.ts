import {
  createApi,
  fetchBaseQuery,
  EndpointBuilder,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import endpoints, { API_BASE_URL, methods } from '../constants/endpoints';
import { RootState } from './store';

type MyBaseQueryFn = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>;

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Project'],
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
    // Create project
    createProject: builder.mutation<
      CreateProjectResponse,
      CreateProjectRequest
    >({
      query: (data) => ({
        url: endpoints.projects.create,
        method: methods.POST,
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),
    // Update project
    updateProject: builder.mutation<
      UpdateProjectResponse,
      UpdateProjectRequest
    >({
      query: (data) => ({
        url: `${endpoints.projects.update}/${data.id}`,
        method: methods.PUT,
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),
    // Project List
    getProjects: builder.query<ApiPaginatedDataResponse<IProject>, void>({
      query: () => ({
        url: endpoints.projects.list,
        method: methods.GET,
      }),
      providesTags: ['Project'],
    }),
    // Project by id
    getProjectById: builder.query<
      ApiSingleDataResponse<IProject>,
      { id: number }
    >({
      query: (data) => ({
        url: `${endpoints.projects.getById}/${data.id}`,
      }),
    }),
    // Project Types
    getProjectTypes: builder.query<
      { success: boolean; data: SelectOption[] },
      void
    >({
      query: () => ({
        url: endpoints.projects.types,
        method: methods.GET,
      }),
    }),
    // Project Status
    getProjectStatuses: builder.query<
      { success: boolean; data: SelectOption[] },
      void
    >({
      query: () => ({
        url: endpoints.projects.statuses,
        method: methods.GET,
      }),
    }),
  }),
});

export default api;
