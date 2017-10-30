const socket = require('socket.io-client')('http://localhost:3000');

socket.on('newPlayer', (response) => {
  console.log('newPlayer');
  console.log(response);
});

socket.on('playerLeaveTable', (response) => {
  console.log('playerLeaveTable');
  console.log(response);
});

socket.on('allplay', (response) => {
  console.log('allplay');
  console.log(response);
});

socket.on('allbet', (response) => {
  console.log('allbet');
  console.log(response);
});

socket.on('bet', (response) => {
  console.log('bet');
  console.log(response);
});

socket.on('hit', (response) => {
  console.log('hit');
  console.log(response);
});