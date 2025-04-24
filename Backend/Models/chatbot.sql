-- Create Database
CREATE DATABASE IF NOT EXISTS chatbot;
USE chatbot;

-- Users table: to store registered users (if your chatbot has user accounts)
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table: to store chat messages between user and bot
CREATE TABLE messages (
  message_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  sender ENUM('user', 'bot') NOT NULL,
  message_text TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Responses table: to store predefined bot responses (if your bot uses a static response system)
CREATE TABLE responses (
  response_id INT PRIMARY KEY AUTO_INCREMENT,
  keyword VARCHAR(100) NOT NULL,
  response_text TEXT NOT NULL
);

-- Logs table: optional - to log sessions or errors
CREATE TABLE logs (
  log_id INT PRIMARY KEY AUTO_INCREMENT,
  log_message TEXT NOT NULL,
  log_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
