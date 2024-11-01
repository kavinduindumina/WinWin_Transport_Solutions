import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.26.152:3000/api/v1', 
  timeout: 10000, // Optional: set timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: You can set up interceptors for request/response handling
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request here if needed (e.g., add authorization token)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
