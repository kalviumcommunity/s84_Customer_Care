import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landhome'; // Import LandingPage
import ChatPage from './pages/chatpage'; // Import ChatPage

export default function App() {
  return (
    <Routes>
      {/* Route for Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Route for Chat Page */}
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}
