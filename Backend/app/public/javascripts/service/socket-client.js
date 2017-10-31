const socket = require('socket.io-client')('http://localhost:3000');
const clickEvent = require('../clickEvents');

let allBetBool = true;
let allPlayedBool = false;

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
  if (allPlayedBool === false){

    allPlayedBool = true;
  }
});


socket.on('allbet', (response) => {
  console.log('allbet');
  console.log(response);

  if (allBetBool === false){
    allBet();
    allBetBool = true;
  }

});

socket.on('bet', (response) => {
  console.log('bet');
  console.log(response);
});

socket.on('hit', (response) => {
  console.log('hit');
  console.log(response);
});