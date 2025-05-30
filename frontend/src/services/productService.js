import axiosInstance from '../api/axios';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getProduct = async () => {
    const response = await axiosInstance.get(`${baseUrl}/product`,{
        withCredentials: true,
      });
    return response.data;
  };

  export const  saveProduct= async () => {
    const response = await axiosInstance.get(`${baseUrl}/product`,{
        withCredentials: true,
      });
    return response.data;
  };