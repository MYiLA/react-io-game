const express = require('express');
const socketio = require('socket.io');

const PORT = 3001;
const app = express();
const server = app.listen(PORT);
const serverio = socketio(server);

serverio.on('connection', socket => {
  console.log('Player connected!', socket.id);

  socket.emit('update', { players: [] });

  // socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  // socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  // socket.on('disconnect', onDisconnect);
});
