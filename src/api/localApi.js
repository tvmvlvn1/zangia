import axios from 'axios';

const api = axios.create({
  baseURL: 'https://local.nomin.mn/service/',
  // baseURL: 'http://192.168.90.169:8000/service/',
});

api.defaults.headers.post['Content-Type'] = 'application/json';
export default api;
