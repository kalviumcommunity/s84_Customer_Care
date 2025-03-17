import { useState } from "react";
import { motion } from "framer-motion";
import './ChatPage.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");

      // Simulate a chatbot response (you can replace this with an actual API call)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "I'm here to frustrate you! 😆", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <motion.h1
        className="text-3xl font-bold mb-4 text-yellow-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        World's Worst Chatbot
      </motion.h1>

      <div className="w-full max-w-lg flex-1 overflow-y-auto bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 ml-auto text-right"
                : "bg-gray-700 mr-auto text-left"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      {/* Input and Send Button */}
      <div className="w-full max-w-lg flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white focus:outline-none"
          placeholder="Type a message..."
        />
        <motion.button
          className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition duration-300"
          whileHover={{ scale: 1.1 }}
          onClick={handleSend}
        >
          Send
        </motion.button>
      </div>
    </div>
  );
}
