'use strict';

// TODO: Test return dispatcher
// It must return a view
// or the server will hang


var HTTP = require('constant-list').HTTP
, View = require('./view')
, querystring = require('querystring')
, Promise = require('promise')
, Response = require('./response')
, Pipeline = require('../combine/pipeline')
, fs = require('fs')
, maxPostData = 2 * 1024 * 1024 // 2mb
;

module.exports = Router;

var methods = [HTTP.GET, HTTP.POST, HTTP.PUT, HTTP.DELETE]
, publicFolder = './public'
, directHandlers = {}
, fallbackHandlers = {};

function Router(groupName) {
  this.root = (groupName) ? `/${groupName}` : '';
}

Router.configure = function(options) {
  if(options.publicFolder) {
    publicFolder = options.publicFolder;
  }
}

/**
 * Associate each HTTP methods
 */
methods.forEach(function(method){

  Router.prototype[method] = (function(method) {
    return function(uri, cb) {
      return register(method, `${this.root}${uri}`, cb);
    }
  })(method);

  directHandlers[method] = {};
  fallbackHandlers[method] = {};

});


function register(method, uri, cb) {
  addDirectHandler(method, uri, cb);
  addFallbackHandler(method, uri, cb);
}


/**
 * Handle the uris without any parameter
 */
function addDirectHandler(method, uri, cb) {
  if(!directHandlers[method]) {
    directHandlers[method] = {};
  }

  if(directHandlers[method][uri]) {
    throw new Error(`Router::addHandler ${uri} is already defined`);
  }

  directHandlers[method][uri] = {
    cb: cb,
    args: []
  };

}

/**
 * Handle the variable uris
 * Example: /foo/:uid/simple/:anotherUid
 */
function addFallbackHandler(method, uri, cb) {

  var pathList = getPathList(uri);

  if(!fallbackHandlers[method]) {
    fallbackHandlers[method] = {};
  }

  if(!fallbackHandlers[method][pathList.length]) {
    fallbackHandlers[method][pathList.length] = [];
  }

  var description = pathList.map(function(param) {
    return {
      param: param,
      isVar: param.startsWith(':')
    }
  });

  fallbackHandlers[method][pathList.length].push({
    description: description,
    cb: cb
  });

}

/**
 * Transfer the request to the correponding callback
 */
function Dispatcher(req, res) {

  var uri = decodeURI(req.url);

  var resolvePublic = function(next) {
    PublicDispatcher(req, res, uri, next);
  };

  var resolveRoute = function(next) {
    UriResolver(req, res, uri, next);
  };

  var pipeline = new Pipeline([
    resolvePublic,
    resolveRoute
  ]);
  pipeline.execute();


}

function UriResolver(req, res, uri, next) {
  var method = req.method.toLowerCase()
  , response = new Response(res);

   var handler = (
    DirectDispatcher(method, uri)
    || FallbackDispatcher(method, uri)
  );

  if(handler) {

    return getBody(req)
      .then(function(body){
        handler.args.push(body);

        return handler.cb.apply({
          req: req,
          res: res,

          render: response.render.bind(response),
          json: response.json.bind(response),
          partial: View.partial,
          react: View.react
        }, handler.args);

      })
      .catch(function(e) {
        if(e == HTTP.REQUEST_ENTITY_TOO_LARGE) {
          return response.error('ENTITY TOO LARGE', e);
        }

        return response.error('FORBIDDEN', HTTP.FORBIDDEN);
      });
  }

  return response.error('PAGE NOT FOUND', HTTP.NOT_FOUND);
}

Router.Dispatcher = Dispatcher;

function PublicDispatcher(req, res, uri, next) {
  if(uri.indexOf('..') != -1) {
    var response = new Response(res);
    return response.error('FORBIDDEN', HTTP.FORBIDDEN);
  }

  var publicFile = publicFolder + uri;
  fs.stat(publicFile, function (err, stats) {
    if(err || !stats.isFile()) {
      return next();
    }

    var response = new Response(res);
    return response.asset(publicFile);
  });

}

/**
 * Simple uri provider
 */
function DirectDispatcher(method, uri) {
  return directHandlers[method][uri];
}

/**
 * Magical uri provider
 * Transform the given parameter
 */
function FallbackDispatcher(method, uri) {

  var pathList = getPathList(uri);

  var fallbackHandlersList = fallbackHandlers[method][pathList.length];
  if(!fallbackHandlersList) {
    return;
  }

  var args = [];
  for(var i=0; i<fallbackHandlersList.length; i++) {
    args.length = 0;

    var fallback = fallbackHandlersList[i];

    var next = fallback.description.some(function(o, key){
      if(o.param != pathList[key] && !o.isVar) {
        return true;
      } else if(o.isVar) {
        args.push(pathList[key]);
      }
      return false;
    });

    if(!next) {
      return {
        cb: fallback.cb,
        args: args
      };

    }

  }

  return;

}


function getBody(req) {

  return new Promise(function(resolve, reject) {
    var data = '';
    req.on('data', function(chunk){
      data += chunk;
      if(data.length > maxPostData) {
        data = '';
        this.destroy();
        reject(HTTP.REQUEST_ENTITY_TOO_LARGE);
      }
    })
    .on('end', function() {
      resolve(querystring.parse(data));
    });
  });


}

function getPathList(uri) {
  return uri.split('/')
    .filter(function(element) {
      return element.length;
    });
}
