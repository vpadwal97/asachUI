import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getMessages, sendMessage } from "../services/ChatService";
const base_Url = process.env.base_Url;

const socket = io(base_Url);
// const socket = io("http://192.168.58.42:8080");

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Get public IP address
        axios.get("https://api.ipify.org?format=json").then(res => {
            setUsername(res.data.ip);
        });

        fetchMessages();

        socket.on("receiveMessage", (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => socket.off("receiveMessage");
    }, []);

    const fetchMessages = async () => {
        const response = await getMessages();
        setMessages(response.data);
    };

    const handleSend = async () => {
        if (!input.trim() || !username) return;
        const message = { sender: username, message: input };
        await sendMessage(username, input);
        socket.emit("sendMessage", message);
        setInput("");
    };

    return (
        <div>
            <h2>Chat App</h2>
            <div style={{ height: "200px", overflowY: "scroll", border: "1px solid #ccc" }}>
                {messages.map((msg, index) => (
                    <div key={index}><strong>{msg.sender}:</strong> {msg.message}</div>
                ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chat;
