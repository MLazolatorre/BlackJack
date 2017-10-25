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
 * log a player
 */
function login(req, res, next) {
  res.render('index', {title: 'Express'});
}

/**
 * logout a player
 */
function logout(req, res, next) {
  res.render('index', {title: 'Express'});
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
  const json = req.body;

  let responseInfo;
  try {
    console.log('joinTable json %j', json);

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
    table.addPlayer(player);

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
    ...responseInfo,
  });
}

/**
 * a player leave the table
 */
function leaveTable(req, res, next) {
  var tables;
  var info;
  try {
    info = getInfoFromReq(req, res, json, 'leaveTable', {table: true});
    assert.ok(info !== false);
    assert.ok(is.nonEmptyObj(info));
    assert.ok(is.nonEmptyObj(info.table));
    assert.ok(is.nonEmptyObj(info.player));
    info.table.rmPlayer(json.playerId);
    tables = Tables.viewTables();
    assert.ok(info.player.tableId === -1);
  } catch(err) {
    logger.error('/leaveTable %s', err.message);
    logger.error('/leaveTable stack %s', err.stack);
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
    player: info.player,
    tables: tables
  });
}

/**
 * a player bet an amount of money and keep his cards
 */
function bet(req, res, next) {
  res.render('index', {title: 'Express'});
}

/**
 * the player want another card
 */
function hit(req, res, next) {
  res.render('index', {title: 'Express'});
}

/**
 * the player keep his card and don't want more
 */
function stand(req, res, next) {
  res.render('index', {title: 'Express'});
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