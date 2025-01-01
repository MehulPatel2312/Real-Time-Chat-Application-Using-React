// Backend - server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow connections from any origin (or specify specific origins if needed)
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_message", (data) => {
    const messageWithTime = {
      text: data.text,
      sender: data.sender,
      timestamp: new Date().toISOString(),
    };

    console.log("Message received:", messageWithTime);

    // Broadcast message with timestamp to other clients
    socket.broadcast.emit("receive_message", messageWithTime);
  });
  

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Listen on all interfaces to allow external connections
server.listen(5000, "0.0.0.0", () => {
  console.log("Server is running on http://192.168.29.154:5000");
});
