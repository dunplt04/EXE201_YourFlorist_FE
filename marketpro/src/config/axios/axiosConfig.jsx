import axios from "axios";

const API_BASE_URL = "https://flourist-gkf7c9aefxcxb4ck.eastasia-01.azurewebsites.net/custom-florist/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tokenFlower");
    console.log('token', token)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
