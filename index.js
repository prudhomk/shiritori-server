import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = path.resolve();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
