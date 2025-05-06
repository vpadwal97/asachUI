import axios from "axios";

// import axios from '../utils/HttpServices';
const base_Url = import.meta.env.base_Url;

const API_URL = `${base_Url}/api/chat`;
// const API_URL = "https://asachapi-production.up.railway.app/api/chat";
// const API_URL = "http://192.168.58.42:8080/api/chat";

export const sendMessage = async (sender, message) => {
  // return axios.post(`${API_URL}/api/chat/send`, { sender, message });
  return axios.post("/api/chat/send", message, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getMessages = async () => {
  return axios.get(`${API_URL}/api/chat/messages`);
};
