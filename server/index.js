require('dotenv').config()
console.log(process.env.REACT_APP_HARPERDB_URL)

const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const PORT = 4000;

const { Server } = require('socket.io')

const harperSaveMessage = require('./services/harperSaveMessage');

app.use(cors()); 

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const CHAT_BOT = 'ChatBot'
let chatRoom = '';
let allUsers = [];

io.on('connection', (socket ) => {
  console.log(`Пользователь ${socket.id} присоединился!!`)
  
  socket.on('join_room', (data) => {
      const { userName, room }  = data;
      socket.join(room);
    
      let __createdtime__ = Date.now();
    
      socket.to(room).emit('receive_message', {
        message: `${userName} присоединился в чат!`,
        userName: CHAT_BOT,
        __createdtime__,
      });

      socket.emit('receive_message', {
        message: `Добро пожаловать ${userName}!`,
        userName: CHAT_BOT,
        __createdtime__,
      });

      chatRoom = room;
      allUsers.push( {id: socket.id, userName, room});
      chatRoomUsers = allUsers.filter((user) => user.room === room);
      socket.to(room).emit('chatroom_users', chatRoomUsers);
      socket.emit('chatroom_users', chatRoomUsers)
  });

  socket.on('send_message', (data) => {
    const { message, userName, room, __createdtime__ } = data;
    io.in(room).emit('receive_message', data); // Send to all users in room, including sender
    harperSaveMessage(message, userName, room, __createdtime__) // Save message in db
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  });
})

app.get('/', (req, res) => {
  res.json('Hello World!!')
})

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});