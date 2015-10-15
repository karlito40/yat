'use strict';

var HTTP = require('constant-list').HTTP
, View = require('./view')
;

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
    throw new Error(`Router::addHandler ${uri} is already defined`);
  }

  handlers[method][uri] = cb;
}

function dispatch(req, res) {
  var method = req.method.toLowerCase();
  console.log('req.url', req.url);

  var uri = decodeURI(req.url);
  
  if(handlers[method] && handlers[method][uri]) {
    handlers[method][uri]
      .bind({
        Request: req,
        Response: res,
        render: function(viewName, data, code) {
          View.render(res, viewName, data, code); 
        },
        json: function(content) {
          View.json(res, content);
        }
      })(/*params*/);
  } else {
    View.error(res, 'PAGE NOT FOUND', HTTP.NOT_FOUND);
  }

}


Router.Dispatcher = dispatch;


