import axios from "axios";
// import { store } from "../reduxStore/Store";
// import { baseAPIURL } from "../constants/TempAppData";

const base_UrlS = import.meta.env.VITE_BASE_URL;

axios.interceptors.request.use(
  function (config) {
    config.baseURL = base_UrlS;
    // config.baseURL = 'https://asachapi-production.up.railway.app/'; // railWay
    // config.baseURL = 'http://192.168.58.42:8080/'; // ME
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
