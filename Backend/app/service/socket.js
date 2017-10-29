// sockets.js
const socketio = require('socket.io');
const Tables = require('../controllers/Tables');
const Players = require('../models/player');
const emitter = require('./Emitter');

let io;


function listen (app){
  io = socketio.listen(app);

  const tablesId = Tables.getIdTable();

  io.sockets.on('connection', function(socket){
    console.log('une connection io');

    let playerId = false;

    emitter.on('login', (player) => {
      console.log('log %d', player);
      playerId = player;
    });

    socket.on('room', function(room) {
      socket.join(room);
    });

    socket.on('disconnect', () => {
      if (playerId) Players.logout(playerId)
    });
  });

  return io;
}


module.exports = {
  listen: listen,
}