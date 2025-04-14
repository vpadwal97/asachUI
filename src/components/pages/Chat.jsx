import { Client } from "@stomp/stompjs";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { getMessages } from "./api";

let stompClient = null;

function Chat() {
  const base_UrlS = process.env.REACT_APP_BASE_URL;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("User");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then((res) => {
      setUsername(res.data.ip);
    });
    fetchMessages();
    connectWebSocket();
  }, []);

  const fetchMessages = async () => {
    const res = await getMessages();
    setMessages(res.data);
  };

  const connectWebSocket = () => {
    const socket = new SockJS(`${base_UrlS}/ws/chat`);
    stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe("/topic/messages", (msg) => {
          const message = JSON.parse(msg.body);
          setMessages((prev) => [...prev, message]);
        });
      }
    });
    stompClient.activate();
  };

  const handleSend = async () => {
    if (!input && !file) return;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sender", username);
      formData.append("type", "chat");
      formData.append("subdir", "chat");

      try {
        const res = await axios.post(
          `${base_UrlS}/api/chat/upload/image`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );

        const imageMessage = res.data; // ChatMessage from backend

        // Send via WebSocket
        stompClient.publish({
          destination: "/app/chat",
          body: JSON.stringify(imageMessage)
        });

        // Show immediately
        // setMessages((prev) => [...prev, imageMessage]);
        setFile(null);
      } catch (err) {
        alert("Image upload failed");
      }

      return;
    }

    const userMessage = {
      sender: username,
      message: input,
      type: "text"
    };

    stompClient.publish({
      destination: "/app/chat",
      body: JSON.stringify(userMessage)
    });

    // setMessages((prev) => [...prev, userMessage]);
    setInput("");
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat 💬</h2>
      <div
        ref={chatBoxRef}
        style={{
          border: "1px solid #ccc",
          height: 400,
          overflowY: "scroll",
          padding: 10,
          marginBottom: 10
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <strong>{msg.sender}:</strong>{" "}
            {msg.type === "image" ? (
              <>
                <img
                  src={`${base_UrlS}/uploads/${msg.message}`}
                  alt="uploaded"
                  style={{ maxWidth: "200px", marginTop: 5 }}
                />
              </>
            ) : (
              msg.message
            )}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          style={{ width: "60%", marginRight: 10 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginRight: 10 }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
