'use strict';

var Server = require('./http/server')
, Accessor = require('./combine/accessor')
, VM = require('./file/vm')
, Router = require('./system/router')
, EXTENSION = require('constant-list').EXTENSION
, String2 = require('./helper/string')
, glob = require('glob')
;

var Config = Object.create(Accessor.object);

module.exports.start = start;
module.exports.Config = Config;

function start() {

  // Objects to configure
  VM.load('./bootstrap', {
    App: Config,
    Router: new Router(),   // Router by default
    // Controller: ControllerConfig,
    // Database: DatabaseConfig,
    // View: ViewConfig
  });

  // Route to configure
  // globSync will be better
  glob('./routes/*.js', {}, function(err, files) {
    console.log('files', files)

    files.forEach(function(file) {

      var path = file.split('/');
      var groupName = String2.subUntill(path[path.length-1], EXTENSION.JS);

      VM.load(`./routes/${groupName}`, {
        Router: new Router(groupName)
      });

    });

  });


  var port = Config.get('port');
  var debug = Config.get('DEBUG');

  console.log('App start on port', port);
  console.log('Debug mode is set to', debug);

  Server.start(Config.get('port'), Router.Dispatcher);
}
