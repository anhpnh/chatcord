const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Run when client connects
io.on("connection", (socket) => {
  //console.log(`New WS connection ${socket.id}`);

  //Welcome current user
  socket.emit("message", "Welcome to ChatCord");

  //Broadcast when user connect
  socket.broadcast.emit("message", "A user has joined the chat");

  //Run client disconnect
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  //Listen for chatMessage
  socket.on("chatMesage", (msg) => {
    io.emit("message", msg);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
});
