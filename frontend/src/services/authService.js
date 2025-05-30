import axiosInstance from '../api/axios';
const baseUrl= process.env.REACT_APP_API_BASE_URL;
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",baseUrl)
export const login = async (userCredentail) => {
  const response = await axiosInstance.post(`${baseUrl}/auth/login`, 
    JSON.stringify(userCredentail)
  );
  localStorage.setItem('accessToken', response.data.accessToken);
  return response;
};

// src/services/authService.js
export const logout = async () => {
    await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
    localStorage.removeItem('accessToken');
  };


