export const API_BASE_URL = 'http://localhost:8000/api/v1';

export const methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELET',
};

const endpoints = {
  auth: {
    register: 'register',
    login: 'login',
    logout: 'logout',
    me: 'me',
  },
  projects: {
    types: 'project-types',
    statuses: 'project-statuses',
    list: 'projects',
    create: 'projects',
  },
};

export default endpoints;
