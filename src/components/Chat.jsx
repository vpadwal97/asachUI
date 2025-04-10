import { Client } from '@stomp/stompjs';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { getMessages } from './api'; // Your API helpers
// import { getMessages, sendChatMessage  } from './api'; // Your API helpers

let stompClient = null;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('User');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then(res => {
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
    const socket = new SockJS('http://192.168.58.42:8080/ws/chat');
    stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe('/topic/messages', (msg) => {
          const message = JSON.parse(msg.body);
          setMessages((prev) => [...prev, message]);
        });
      },
    });
    stompClient.activate();
  };

  const handleSend = async () => {
    if (!input && !file) return;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Optional: allow user to choose subdir (e.g., "chat", "profile", etc.)
      const subdir = 'chat'; // Change this if you allow dynamic subdirectories
      formData.append('subdir', subdir);

      try {
        const res = await axios.post('http://192.168.58.42:8080/api/chat/upload/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const imagePath = res.data; // e.g., "/images/chat/myphoto.jpg"
        const imageMessage = {
          sender: username,
          message: imagePath,
          type: 'image',
        };

        stompClient.publish({
          destination: '/app/chat',
          body: JSON.stringify(imageMessage),
        });

        setFile(null);
      } catch (err) {
        alert('Image upload failed');
      }

      return;
    }

    // Text message
    const userMessage = {
      sender: username,
      message: input,
      type: 'text',
    };

    stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify(userMessage),
    });

    setInput('');

    // GPT reply
    // const res = await sendChatMessage(userMessage);
    // const botMessage = {
    //   sender: 'GPT',
    //   message: res.data.reply,
    //   type: 'text',
    // };

    // stompClient.publish({
    //   destination: '/app/chat',
    //   body: JSON.stringify(botMessage),
    // });
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
          border: '1px solid #ccc',
          height: 400,
          overflowY: 'scroll',
          padding: 10,
          marginBottom: 10,
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <strong>{msg.sender}:</strong>{' '}
            {msg.type === 'image' ? (
              <img
                src={`http://192.168.58.42:8080/uploads${msg.message}`}
                alt="Uploaded"
                style={{ maxWidth: '200px', marginTop: 5 }}
              />
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
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{ width: '60%', marginRight: 10 }}
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
