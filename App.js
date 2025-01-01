import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://192.168.29.154:5000"); // Replace with your server's IP

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      const receivedMessage = {
        text: data.text,
        sender: "other", // Mark sender as "other" for received messages
        timestamp: data.timestamp,
        seen: false, // Initially, the message is not seen
      };
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

   

    return () => {
      socket.off("receive_message");
      socket.off("message_seen");
    };
  }, []);

 
  useEffect(() => {
    // Auto-scroll to the bottom of the chat window
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageData = {
        text: message,
        sender: "self",
        timestamp: new Date().toISOString(),
        seen: false, // Initially, the message is not seen
      };

      socket.emit("send_message", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">Chat</div>
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === "self" ? "self" : "other"
              }`}
            >
              <div className="message-content">
                <div className="message-text">{msg.text}</div>
                <div className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {/* {msg.sender === "self" && msg.seen && (
                    <span className="seen-indicator">✓✓</span>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="input-box">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
