'use strict';
var path = require('path')
, https = require('https')
, http = require('http')
, fs = require('fs');

module.exports.start = start;

function start(options, cb) {
  var port = (options && options.port) || 9999;
  
  var server = null;
  if(options && options.ssl) {
    console.log('starting https server on port', port);
    server = https.createServer({
        key: fs.readFileSync(options.ssl.key + '.pem'),
        cert: fs.readFileSync(options.ssl.cert + '.pem')
      }, cb);  
  } else {
    console.log('starting http server on port', port);
    server = http.createServer(cb);  
  }
  
  server.listen(port);
  
  return server;
}
