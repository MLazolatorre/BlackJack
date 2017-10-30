// sockets.js
const socketio = require('socket.io');
const Tables = require('../controllers/Tables');
const Players = require('../models/player');
const emitter = require('./Emitter');

let io;


function listen (app){
  io = socketio.listen(app);

  io.sockets.on('connection', function(socket){
    console.log('une connection io');

    let playerId = false;

    emitter.on('login', (player) => {
      console.log('player %d logged in', player);
      playerId = player;
    });

    socket.on('joinRoom', (room) => {
      socket.join(room);
      io.sockets.in(room).emit('newPlayer', Players.getById(playerId));
    });

    socket.on('leaveRoom', (room) => {
      socket.leave(room);
    });

    // disconnect the player if we lose the connection
    socket.on('disconnect', () => {
      if (playerId) Players.logout(playerId)
    });
  });

  emitter.on('allplay', (room) => {
    io.sockets.in(room).emit('allPlay');
  });

  emitter.on('bet', (room, playerId, bet) => {
    io.sockets.in(room).emit('bet', {
      playerId,
      bet,
    });
  });

  emitter.on('hit', (room, playerId, card) => {
    io.sockets.in(room).emit('hit', {
      playerId,
      card,
    });
  });

  return io;
}


module.exports = {
  listen: listen,
}