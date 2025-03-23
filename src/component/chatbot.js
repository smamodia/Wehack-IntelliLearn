import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Chatbot.css'; // Custom CSS for additional styling
import bg from './bg.mp4'

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [...prev, { text: 'Error: ' + data.error, isUser: false }]);
      } else {
        // Format the bot's response: replace ** with <strong> and handle line breaks
        const formattedAnswer = data.answer
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text (corrected regex)
          .replace(/\n/g, '<br>'); // Line breaks
        setMessages((prev) => [...prev, { text: formattedAnswer, isUser: false }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: 'Error: Unable to connect to the server.', isUser: false },
      ]);
      console.error(error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    textColor: isDarkMode ? '#fff' : '#000',
    cardBackground: isDarkMode ? '#2c2c2c' : '#fff',
    cardTextColor: isDarkMode ? '#fff' : '#000',
    inputBackground: isDarkMode ? '#444' : '#fff',
    inputTextColor: isDarkMode ? '#fff' : '#000',
    inputPlaceholderColor: isDarkMode ? '#aaa' : '#666',
  };

  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Chatbot Container */}
      <div
        className="chatbot-container p-4"
        style={{
          width: '600px',
          height: '700px',
          backgroundColor: isDarkMode ? 'rgba(44, 44, 44, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 style={{ color: themeStyles.textColor }}>How can I help you?</h3>
          <button
            className="btn btn-link"
            onClick={toggleTheme}
            style={{ color: themeStyles.textColor }}
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="lg" />
          </button>
        </div>

        <div
          className="chat-box mb-3 p-3"
          style={{
            height: '500px',
            overflowY: 'auto',
            border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
            borderRadius: '5px',
            backgroundColor: themeStyles.backgroundColor,
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message p-2 mb-2 ${msg.isUser ? 'user-message' : 'bot-message'}`}
              style={{
                backgroundColor: msg.isUser
                  ? isDarkMode
                    ? '#3CA9D1'
                    : '#e3f2fd'
                  : isDarkMode
                  ? '#444'
                  : '#f5f5f5',
                borderRadius: '5px',
                color: msg.isUser ? '#fff' : themeStyles.textColor,
                textAlign: msg.isUser ? 'right' : 'left',
              }}
            >
              {/* Render bot messages as HTML to support <strong> and <br> tags */}
              {msg.isUser ? (
                msg.text
              ) : (
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
              )}
            </div>
          ))}
        </div>

        <div className="input-container d-flex gap-2">
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your question here..."
            style={{
              backgroundColor: themeStyles.inputBackground,
              color: themeStyles.inputTextColor,
              border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
            }}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;