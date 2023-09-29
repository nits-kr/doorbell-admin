import axios from 'axios';

const API_BASE_URL = 'https://www.techgropsedev.com:2053/';

const AuthenticatedAPI = () => {
  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
};

export default AuthenticatedAPI;
