const socket = require('socket.io-client')('http://localhost:3000');
const clickEvent = require('../clickEvents');

let allBetBool = false;
let allPlayedBool = false;

socket.on('newPlayer', (response) => {
  console.log('Socket : newPlayer');
  console.log(response);
});

socket.on('playerLeaveTable', (response) => {
  console.log('Socket : playerLeaveTable');
  console.log(response);
});

socket.on('allplay', (response) => {
  console.log('Socket : allplay');
  console.log(response);
  allBetBool = false;
});


socket.on('allbet', (response) => {
  console.log('Socket : allbet');
  console.log(response);

  if (allBetBool === false){
    clickEvent.allBet();
    allBetBool = true;
  }

});

socket.on('bet', (response) => {
  console.log('Socket : bet');
  console.log(response);
});

socket.on('hit', (response) => {
  console.log('Socket : hit');
  console.log(response);
});