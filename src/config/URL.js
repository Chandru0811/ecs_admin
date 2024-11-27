import axios from "axios";

const api = axios.create({
  baseURL: "https://ecsaio.com/ecsaio/public/api/",
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Setting Authorization header:", `Bearer ${token}`);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;