const request = require('ajax-request');

const uri = 'http://localhost:3000/api/';

window.create = function() {
  request({
    url: uri + 'createAccount',
    method: 'POST',
    data: {
      name: 'marc',
      pwd: 'haha'
    }
  }, function (err, res, body) {
    console.log(body);
  });
};

window.create2 = function() {
  request({
    url: uri + 'createAccount',
    method: 'POST',
    data: {
      name: 'marc2',
      pwd: 'haha2',
    }
  }, function (err, res, body) {
    console.log(body);
  });
};

window.login = function() {
  request({
    url: uri + 'login',
    method: 'POST',
    data: {
      playerName: 'marc',
      pwd: 'haha'
    }
  }, function (err, res, body) {
    console.log(body);
  });
};

window.login2 = function() {
  request({
    url: uri + 'login',
    method: 'POST',
    data: {
      playerName: 'marc2',
      pwd: 'haha2'
    }
  }, function (err, res, body) {
    console.log(body);
  });
};

window.joinTable2 = function () {
  request({
    url: uri + 'joinTable',
    method: 'POST',
    data: {
      playerId: 2,
      tableId: 1,
    }
  }, function (err, res, body) {
    console.log(body);
  });
};

window.joinTable = function () {
  request({
    url: uri + 'joinTable',
    method: 'POST',
    data: {
      playerId: 1,
      tableId: 1,
    }
  }, function (err, res, body) {
    console.log(body);
  });
};

window.bet = function () {
  request({
    url: uri + 'bet',
    method: 'POST',
    data: {
      playerId: 1,
      bet: 100,
    }
  }, function (err, res, body) {
    console.log(body);
  });
};


window.hit = function() {
  request({
    url: uri + 'hit',
    method: 'POST',
    data: {
      playerId: 1,
    }
  }, function (err, res, body) {
    console.log(body);
  });
};

window.stand = function() {
  request({
    url: uri + 'stand',
    method: 'POST',
    data: {
      playerId: 1,
    }
  }, function (err, res, body) {
    console.log(body);
  });
};

console.log('ab');
