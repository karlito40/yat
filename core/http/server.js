'use strict';

var http    = require('http')
, path      = require('path')

module.exports.start = start;

function start(port, cb) {
  console.log('starting server on port', port);

  http
    .createServer(cb)
    .listen(port);

}
