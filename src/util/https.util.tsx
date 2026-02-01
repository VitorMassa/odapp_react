import axios from "axios";

export const https = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

https.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

