'use strict';

var HTTP = require('constant-list').HTTP
, View = require('./view');

module.exports = Router;

var methods = ['get', 'post', 'put', 'del']
, handlers = {};;

function Router(groupName) {
  this.root = (groupName) ? `/${groupName}` : '';
}

methods.forEach(function(method){

  Router.prototype[method] = (function(method) {
    return function(uri, cb) {
      return addHandler(method, `${this.root}${uri}`, cb);
    }
  })(method);

});

function addHandler(method, uri, cb) {
  console.log('add handler', method, uri)
  if(!handlers[method]) {
    handlers[method] = {};
  }

  if(handlers[method][uri]) {
    // Send event error
    throw new Error(`Router::addHandler ${route} is already defined`);
  }

  handlers[method][uri] = cb;
}

function dispatch(req, res) {
  var method = req.method.toLowerCase();
  console.log('req.url', req.url);

  var uri = decodeURI(req.url);

  if(handlers[method] && handlers[method][uri]) {
    // Promisify
    handlers[method][uri]
      .bind({
        View: View,
        Request: req,
        Response: res     // Will be useless with View
      })(/*params*/);     // params get, ...
  } else {
    // 404
  }

  res.writeHead(HTTP.OK, {
    'Content-Type': 'text/html'
  });
  res.end('Yeaaa');
}


Router.Dispatcher = dispatch;


