import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: "http://192.168.1.159:1337/",
});

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;
