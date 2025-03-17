import { useState } from "react";
import "./chatpage.css"; // Import the new CSS file

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { text: "Welcome! How can I *not* help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, sender: "user" }]);

    // Fake bot response after a delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I have no idea how to help you!", sender: "bot" }
      ]);
    }, 1000);

    setInput(""); // Clear input
  };

  return (
    <div className="chat-container">
      <h1 className="text-4xl font-bold text-yellow-400">World's Worst Chatbot</h1>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "bot" ? "bot-message" : "user-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
