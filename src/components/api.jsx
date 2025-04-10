import axios from "axios";
const base_UrlS = process.env.base_Url || "http://192.168.58.42:8080";

const API = axios.create({
  baseURL: `${base_UrlS}/api/chat`,
  // baseURL: 'http://localhost:8080/api/chat',
  withCredentials: false // ❗ Set to false since you allow all origins
});

export const sendChatMessage = (message) => API.post("/send", message); // message is a JS object

export const getMessages = () => API.get("/messages");
