const express = require('express');
const socketio = require('socket.io');

const PORT = 3001;
const app = express();
const server = app.listen(PORT);
const serverio = socketio(server);

const WORLD = { WIDTH: 600, HEIGHT: 600 }; 
let players = [];
let sockets = [];

const disconnect = (id) => {
  players = players.filter(player => id !== player.id);
  sockets = sockets.filter(sockets => id !== sockets.id);
};

serverio.on('connection', socket => {
  console.log('Player connected!', socket.id);

  sockets.push(socket);
  players.push({
    id: socket.id,
    x: Math.random() * WORLD.WIDTH,
    y: Math.random() * WORLD.HEIGHT,
  });

  socket.emit('update', { WORLD, players });

  // socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
  // socket.on(Constants.MSG_TYPES.INPUT, handleInput);
  socket.on('disconnect', () => disconnect(socket.id));
});

const INTERVAL = 200;

const update = () => {
  players.forEach(player => {
    player.x = (player.x + 10) % WORLD.WIDTH;
    player.y = (player.y + 10) % WORLD.WIDTH;
  });
  Object.values(sockets).forEach(socket =>
    socket.emit('update', { WORLD, players }));
};

setInterval(update, INTERVAL);
