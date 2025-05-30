// src/api/axios.js
import axios from 'axios';
axios.defaults.withCredentials = true; 
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
//console.log('Axios withCredentials:', axios.defaults.withCredentials); 

// Request Interceptor to add access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
   // alert(token);
    if (token) {
        //alert("hh")
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
       // axios.post('/api/auth/refresh-token', {}, { withCredentials: true })
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true } // Include HttpOnly cookie
        );
        localStorage.setItem('accessToken', data.accessToken);
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
        // Redirect to login or handle logout
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
