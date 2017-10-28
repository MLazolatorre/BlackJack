/**
 * all api request declaration
 */
const express = require('express');
const url = require('url');
const querystring = require('querystring');
const router = express.Router();
const is = require('is2');

const Players = require('../models/player');
const Tables = require('../controllers/Tables');

router.post('/createAccount', createAccount);
router.post('/login', login);
router.post('/logout', logout);
router.get('/viewTables', viewTable);
router.get('/createTables', creationTable);
router.post('/joinTable', joinTable);
router.post('/leaveTable', leaveTable);
router.post('/bet', bet);
router.post('/hit', hit);
router.post('/stand', stand);
router.post('/doubleDown', doubleDown);
router.post('/surrender', surrender);
router.post('/split', split);

/*
 * Route's function declaration
 */

/**
 * Create a player
 */
function createAccount(req, res, next) {
  const pwd = req.body.pwd;
  const name = req.body.name;
  Players.checkAccountExist(pwd, name)
    .then((result) => {
      if (result) throw new Error('The account already exist');

      Players.createAccount(pwd, name)
    })
    .then(() => {
      const playerId = Players.addPlayer(name);
      const player = Players.getById(playerId);

      //here we are connected
      const tables = Tables.viewTables();

      res.json({
        success: true,
        cmd: 'createAccount',
        playerId: playerId,
        player: player,
        tables: tables,
      })
    }).catch((err) => {
    console.error('/createAccount %s', err.message);
    console.error('/createAccount stack %s', err.stack);

    res.json({
      success: false,
      cmd: 'createAccount',
      error: err.message,
      stack: err.stack
    });
  });
}

/**
 * log a player
 */
function login(req, res, next) {
  let id;
  let tables;
  let player;

  const playerName = req.body.playerName;

  if (!is.nonEmptyStr(playerName)) {
    res.json({
      success: false,
      cmd: 'login',
      error: 'Invalid name field: ' + playerName,
    });
    return;
  }

  try {
    id = Players.login(playerName);
    player = Players.getById(id);
    tables = Tables.viewTables();

  } catch (err) {
    console.error('/login %s', err.message);
    console.error('/login stack %s', err.stack);
    res.json({
      success: false,
      cmd: 'login',
      error: err.message,
      stack: err.stack
    });

    return;
  }

  var data = {
    success: true,
    cmd: 'login',
    playerId: id,
    player: player,
    tables: tables
  };

  if (player.tableId !== -1 && is.positiveInt(player.tableId)) data.table = tables[player.tableId];

  res.json(data);
}

/**
 * logout a player
 */
function logout(req, res, next) {
  const playerId = req.body.playerId;
  const player = Players.getById(playerId);

  const tableId = player.tableId;
  const table = Tables.all[tableId];

  try {
    if (tableId !== -1) {
      const hasId = Tables.all.hasOwnProperty(tableId);
      if (hasId) {
        table.rmPlayer(json.playerId);
      }
    }

  } catch (err) {
    console.error('/logout %s', err.message);
    console.error('/logout stack %s', err.stack);

    res.json({
      success: false,
      cmd: 'logout',
      error: err.message,
      stack: err.stack
    });

    return;
  }

  res.json({
    success: true,
    cmd: 'logout',
    credits: info.player.credits
  });
}

/**
 * get information of the table
 */
function viewTable(req, res, next) {
  let data;
  try {
    data = Tables.viewTables();
  } catch (err) {
    console.error('/viewTables %s', err.message);
    console.error('/viewTables stack %s', err.stack);
    res.json({
      success: false,
      cmd: 'viewTables',
      error: 'Error viewing tables: ' + err.message,
      stack: err.stack
    });

    return;
  }

  const info = {success: true, cmd: 'viewTables', tables: data};
  console.log('/viewTables %j', info);

  res.json(info);
}

/**
 * create an new game table
 */
function creationTable(req, res, next) {
  res.render('index', {title: 'Express'});
}

/**
 * a player join the table
 */
function joinTable(req, res, next) {
  const tableId = req.body.tableId;
  const playerId = req.body.playerId;

  let responseInfo;
  try {
    console.log('joinTable json %j', req.body);

    if (!is.obj(Tables.all[tableId])) {
      var err = new Error('There is no table with id: ' + tableId);
      res.json({
        success: false,
        cmd: 'joinTable',
        error: err.message,
        stack: err.stack
      });

      return;
    }
    const table = Tables.getById(tableId);
    table.addPlayer(playerId);

    const tableView = table.view();
    const player = Players.getById(playerId);

    responseInfo = {
      table: tableView,
      player: player,
    }
  } catch (err) {
    console.error('/joinTable %s', err.message);
    console.error('/joinTable stack %s', err.stack);
    res.json({
      success: false,
      cmd: 'joinTable',
      error: err.message,
      stack: err.stack
    });
    return;
  }
  res.json({
    success: true,
    cmd: 'joinTable',
    table: responseInfo.table,
    player: responseInfo.player,
  });
}

/**
 * a player leave the table
 */
function leaveTable(req, res, next) {
  const playerId = req.body.playerId;
  const player = Players.getById(playerId);

  const tableId = player.tableId;
  const table = Tables.getById(tableId);
  let tablesView;
  try {
    table.rmPlayer(playerId)
    tablesView = Tables.viewTables();
  } catch (err) {
    console.error('/leaveTable %s', err.message);
    console.error('/leaveTable stack %s', err.stack);

    res.json({
      success: false,
      cmd: 'leaveTable',
      error: err.message,
      stack: err.stack
    });
    return;
  }
  res.json({
    success: true,
    cmd: 'leaveTable',
    player: playerId,
    tables: tablesView,
  });
}

/**
 * a player bet an amount of money and keep his cards
 */
function bet(req, res, next) {
  const playerId = req.body.playerId;
  const player = Players.getById(playerId);

  const bet = req.body.bet;

  const table = Tables.getById(player.tableId);
  let tableView;

  try {
    if (bet > player.credits) {
      const err = new Error('Bet amount ' + bet + ' is more than you ' + 'currently have: ' + player.credits);
      res.json({
        success: false,
        cmd: 'bet',
        error: err.message,
        stack: err.stack
      });
      return;
    }
    table.bet(playerId, bet);
    tableView = table.view();
  } catch (err) {
    console.error('/bet %s', err.message);
    console.error('/bet stack %s', err.stack);

    res.json({
      success: false,
      cmd: 'bet',
      error: err.message,
      stack: err.stack,
    });

    return;
  }

  res.json({
    success: true,
    cmd: 'bet',
    player: player,
    table: tableView,
  });
}

/**
 * the player want another card
 */
function hit(req, res, next) {
  const playerId = req.body.playerId;
  const player = Players.getById(playerId);

  const tableId = player.tableId;
  const table = Tables.getById(tableId);
  let tableView;

  try {
    table.hit(playerId);
    tableView = table.view();
  } catch (err) {
    console.error('/hit %s', err.message);
    console.error('/hit stack %s', err.stack);
    res.json({
      success: false,
      cmd: 'hit',
      error: err.message,
      stack: err.stack
    });

    return;
  }

  var data = {
    success: true,
    cmd: 'hit',
    player: player,
    table: tableView,
  };

  res.json(data);
}

/**
 * the player keep his card and don't want more
 */
function stand(req, res, next) {
  const playerId = req.body.playerId;
  const player = Players.getById(playerId);

  const tableId = player.tableId;
  const table = Tables.getById(tableId);
  let tableView;

  try {
    table.stand(playerId);
    tableView = table.view();
  } catch (err) {
    console.error('/stand %s', err.message);
    console.error('/stand stack %s', err.stack);
    res.json({
      success: false,
      cmd: 'stand',
      error: err.message,
      stack: err.stack
    });
    return;
  }
  res.json({
    success: true,
    cmd: 'stand',
    player: info.player,
    table: table
  });
}

/**
 * The player may increase the initial bet by up to 100% in exchange for committing to stand after receiving exactly
 * one more card. The additional bet is placed in the betting box next to the original bet. Some games do not permit
 * the player to increase the bet by amounts other than 100%. Non-controlling players may double their wager or decline
 * to do so, but they are bound by the controlling player's decision to take only one card.
 */
function doubleDown(req, res, next) {
  res.render('index', {title: 'Express'});
}

/**
 * the player leave his cards (only available on the first call/decision)
 */
function surrender(req, res, next) {
  res.render('index', {title: 'Express'});
}

function split(req, res, next) {
  res.render('index', {title: 'Express'});
}

module.exports = router;