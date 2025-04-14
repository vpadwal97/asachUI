import { Client } from "@stomp/stompjs";
import axios from "axios";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { getMessages, sendMessage } from "../services/ChatService";

const Chat = () => {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const base_Url = process.env.base_Url;

  useEffect(() => {
    // Get public IP address for username
    axios.get("https://api.ipify.org?format=json").then((res) => {
      setUsername(res.data.ip);
    });

    fetchMessages();

    // Setup STOMP over SockJS
    const sock = new SockJS(`${base_Url}/ws`);
    // const sock = new SockJS("http://192.168.58.42:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => sock,
      onConnect: () => {
        stompClient.subscribe("/topic/messages", (message) => {
          const body = JSON.parse(message.body);
          setMessages((prev) => [...prev, body]);
        });
      }
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const fetchMessages = async () => {
    const response = await getMessages();
    setMessages(response.data);
  };

  const handleSend = async () => {
    if (!input.trim() || !username || !client) return;

    const message = {
      sender: username,
      message: input // NOTE: content not 'message'
    };

    // Save to backend DB
    await sendMessage(username, input);

    // Send to WebSocket
    client.publish({
      destination: "/app/chat",
      body: JSON.stringify(message)
    });

    setInput("");
  };

  return (
    <div>
      <h2>Chat App</h2>
      <div
      // style={{
      //   height: "200px",
      //   overflowY: "scroll",
      //   border: "1px solid #ccc",
      // }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
