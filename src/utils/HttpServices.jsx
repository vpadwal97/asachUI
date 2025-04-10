import axios from "axios";
// import { store } from "../reduxStore/Store";
// import { baseAPIURL } from "../constants/TempAppData";

axios.interceptors.request.use(
  function (config) {
    // config.baseURL = baseAPIURL;
    // config.baseURL = 'https://asachapi-production.up.railway.app/'; // prathmesh
    config.baseURL = 'http://192.168.58.42:8080/'; // prathmesh
    // config.baseURL = "https://onlineshoppingapi.octashop.com/";//octashop
    // config.baseURL = "https://proscaleapi.quantstate.ai/";//proscale
    // config.baseURL = 'http://192.168.58.180:8080/'; // prathmesh
    // config.baseURL = "http://192.168.58.40:9198/"; // ketan
    // config.baseURL = "http://192.168.58.171:9198/"; // mangyax
    //  config.baseURL = 'http://192.168.58.49:9198/'; // shubham
    // config.baseURL = 'http://localhost:8080/';
    // config.baseURL = 'http://192.168.58.70:9198/';//Meenakshi
    
  

    // const state = store.getState().persistedReducer.loginDetails;
    // const appReducer = store.getState().persistedReducer.appReducer;
    // const login = state.loginStatus;
    // const catalogue = appReducer.catalogue.id;
    // if (login && login == true) {
    //   const token = state.authCode || null;
    //   const loginId = state.userID || null;
    //   if (token) {
    //     config.headers["Authorization"] = "Bearer " + token;
    //   }
    //   if (loginId) {
    //     config.headers["loginId"] = loginId;
    //   }
    // }
    // if (catalogue) {
    //   config.headers["catalogue"] = catalogue;
    // } 
    // else {
    //   config.headers["catalogue"] = 89;
      // config.headers["catalogue"] = 478;

    // }
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
