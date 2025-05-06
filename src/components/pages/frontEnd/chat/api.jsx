import axios from "axios";
const base_UrlS = import.meta.env.VITE_BASE_URL;

const API = axios.create({
  baseURL: `${base_UrlS}/api/chat`,
  // baseURL: 'http://localhost:8080/api/chat',
  withCredentials: false // ❗ Set to false since you allow all origins
});

export const sendChatMessage = (message) => API.post("/send", message); // message is a JS object

export const getMessages = () => API.get("/messages");
