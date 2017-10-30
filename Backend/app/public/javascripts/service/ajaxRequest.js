const request = require('ajax-request');

const uri = 'http://localhost:3000/api/';

function createAccount(name, pwd, cb) {
  request({
    url: uri + 'createAccount',
    method: 'POST',
    data: {
      name,
      pwd,
    }
  }, function (err, res, body) {
    cb(body);
  });
}

function login(name, pwd, cb) {
  request({
    url: uri + 'login',
    method: 'POST',
    data: {
      playerName: name,
      pwd,
    }
  }, function (err, res, body) {
    cb(body);
  });
}

function joinTable (playerId, tableId, cb) {
  request({
    url: uri + 'joinTable',
    method: 'POST',
    data: {
      playerId,
      tableId,
    }
  }, function (err, res, body) {
    cb(body);
  });
}

function bet(playerId, amount, cb) {
  request({
    url: uri + 'bet',
    method: 'POST',
    data: {
      playerId,
      amount,
    }
  }, function (err, res, body) {
    cb(body);
  });
}

function hit(playerId, cb) {
  request({
    url: uri + 'hit',
    method: 'POST',
    data: {
      playerId,
    }
  }, function (err, res, body) {
    cb(body);
  });
}

function stand(playerId, cb) {
  request({
    url: uri + 'stand',
    method: 'POST',
    data: {
      playerId,
    }
  }, function (err, res, body) {
    cb(body);
  });
}