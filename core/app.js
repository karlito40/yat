'use strict';

const Server = require('./http/server')
, Accessor = require('./combine/accessor')
, VM = require('./file/vm')
, Router = require('./system/router')
, Module = require('./system/module')
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
    Module: Module,
    Router: new Router(),   // Router by default
  });
  Router.configure(Config)

  Module.start();

  // Route to configure
  var files = glob.sync('./routes/*.js', {});
  files.forEach(function(file) {

    var path = file.split('/');
    var groupName = String2.subUntill(path[path.length-1], EXTENSION.JS);

    VM.load(`./routes/${groupName}`, {
      Router: new Router(groupName)
    });

  });

  const port = Config.get('port');
  const debug = Config.get('DEBUG');

  console.log('App start on port', port);
  console.log('Debug mode is set to', debug);

  Server.start(Config, Router.Dispatcher);
}
