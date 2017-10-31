// sockets.js
const socketio = require('socket.io');
const Tables = require('../controllers/Tables');
const Players = require('../models/player');
const emitter = require('./Emitter');

let io;


function listen(app) {
  io = socketio.listen(app);

  io.sockets.on('connection', function (socket) {
    console.log('une connection io');

    let playerId = false;

    emitter.on('login', (player) => {
      console.log('Sockets : player %d logged in', player);
      playerId = player;
    });

    emitter.on('joinRoom', (room) => {
      console.log('Socket : player %d join the table %d',playerId, room);
      io.sockets.in(`/${room}`).emit('newPlayer', {
        playerId: Players.getById(playerId)
      });
      socket.join(`/${room}`);
    });

    socket.on('leaveRoom', (room) => {
      socket.leave(`/${room}`);
    });

    // disconnect the player if we lose the connection
    socket.on('disconnect', () => {
      //if (playerId) Players.logout(playerId)
    });
  });

  emitter.on('playerLeaveTable', (room, playerId) => {
    io.sockets.in(`/${room}`).emit('playerLeaveTable', {
      playerId
    });
  });

  emitter.on('allplay', (room) => {
    console.log('Socket : all player played on table %d', room);
    io.sockets.in(`/${room}`).emit('allPlay');
  });

  emitter.on('allbet', () => {
    io.sockets.in(`/${room}`).emit('allbet');
  });

  emitter.on('bet', (room, playerId, bet) => {
    console.log('socket : player %d bet %d on table %d', playerId, bet, room);
    io.sockets.in(`/${room}`).emit('bet', {
      playerId,
      bet,
    });
  });

  emitter.on('hit', (room, playerId, card) => {
    io.sockets.in(`/${room}`).emit('hit', {
      playerId,
      card,
    });
  });

  return io;
}


module.exports = {
  listen: listen,
};