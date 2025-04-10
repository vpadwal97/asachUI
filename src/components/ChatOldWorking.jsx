import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { getMessages, sendChatMessage } from './api';

let stompClient = null;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('User');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    connectWebSocket();
  }, []);

  const fetchMessages = async () => {
    const res = await getMessages();
    setMessages(res.data);
  };

  const connectWebSocket = () => {
    const socket = new SockJS('http://192.168.58.42:8080/ws/chat');
    stompClient = over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/messages', (msg) => {
        const message = JSON.parse(msg.body);
        setMessages((prev) => [...prev, message]);
      });
    });
  };

  const handleSend = async () => {
    const userMessage = {
      sender: username,
      message: input,
    };

    stompClient.send('/app/chat', {}, JSON.stringify(userMessage));
    setInput('');

    // GPT reply
    const res = await sendChatMessage (input);
    const botMessage = {
      sender: 'GPT',
      message: res.data.reply,
    };

    stompClient.send('/app/chat', {}, JSON.stringify(botMessage));
  };

  useEffect(() => {
    // Auto-scroll
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    <div style={{ padding: 20 }}>
      <h2>GPT Chatbot 💬</h2>
      <div
        ref={chatBoxRef}
        style={{ border: '1px solid #ccc', height: 400, overflowY: 'scroll', padding: 10 }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{ width: '80%' }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
