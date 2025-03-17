import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <motion.h1 
        className="text-5xl font-bold text-center mb-4 text-yellow-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to the World's Worst "Customer Support" Chatbot!
      </motion.h1>
      
      <motion.p 
        className="text-lg text-center max-w-2xl mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Tired of getting helpful responses? Look no further! This chatbot guarantees to frustrate, confuse, and amuse you with the worst customer support ever. Ask anything, and get the most absurd responses possible.
      </motion.p>

      {/* Centered Button */}
      <div className="flex justify-center w-full">
        <motion.button
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-500 transition duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/chat")}
        >
          Start Chat
        </motion.button>
      </div>
    </div>
  );
}
