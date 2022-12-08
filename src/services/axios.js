import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accepted: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
export default instance;
