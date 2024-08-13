import axios from 'axios';

const API_URL = 'http://localhost:2000/api/auth';

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const signup = (email, password) => {
  return axios.post(`${API_URL}/signup`, { email, password });
};

export const forgotPassword = (email) => {
  return axios.post(`${API_URL}/forgot--password`, { email });
};
