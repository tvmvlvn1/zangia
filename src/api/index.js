import axios from 'axios';

const api = axios.create({
  baseURL: 'https://local.nomin.mn/apps/TimeAttendeceIntegration/rest',
  auth: {
    username: 'api',
    password: 'api',
  },
});

api.defaults.headers.post['Content-Type'] = 'application/json';
export default api;
