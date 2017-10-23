/**
 * Created by MARC LAZOLA TORRE on 02/10/2017.
 */

var io = require('socket.io');

var setSocketOnServer = function (app) {
  io.listen(app);
}

