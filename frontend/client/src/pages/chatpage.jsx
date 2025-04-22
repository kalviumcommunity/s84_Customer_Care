// File: ChatPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // <-- Import auth context
import "./chatpage.css";

export default function ChatPage() {
  const { user, logout } = useAuth(); // <-- Use auth
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { text: "Welcome! How can I *not* help you today?", sender: "bot", senderName: "Chatbot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { text: input, sender: "user", senderName: user?.username || "You" }
    ]);

    try {
      // Fetch joke from API
      const response = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });

      // Add bot response
      setMessages((prev) => [
        ...prev,
        { text: response.data.joke, sender: "bot", senderName: "Chatbot" }
      ]);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Oops! I'm too lazy to fetch a joke 😴", sender: "bot", senderName: "Chatbot" }
      ]);
    }

    setInput(""); // Clear input
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="chat-container">
      <h1 className="text-4xl font-bold text-yellow-400">World's Worst Chatbot</h1>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "bot" ? "bot-message" : "user-message"}`}
          >
            <div>{msg.text}</div>
            <div className="sender-label">sent by {msg.senderName}</div>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
