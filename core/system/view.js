var jade = require('jade')
, HTTP = require('constant-list').HTTP
, TYPE = require('constant-list').TYPE
, Promise = require('promise');

module.exports.render = render;
module.exports.json = json;
module.exports.error = error;
module.exports.partial = partial;

function _resolveObject(data, cb) {
  if(!data) {
    return cb(null, data);
  }
  
  var res = {}
  , nbKey = Object.keys(data).length
  , refLength = 0
  , done = false;
  
  function addRef(key, value) {
    res[key] = value;
    refLength++;
    if(!done && refLength >= nbKey ) {
      cb(null, res);
      done = true;
    }
  }
  
  for(var key in data) {
    var value = data[key]; 
    if(typeof value == TYPE.OBJECT && value.then) {
      value.then(
          (function(key) {
            return function(res) {
              addRef(key, res);
            }
          })(key)
        )
        .catch(function(e) {
          if(!done) {
            done = true;
            cb(e);  
          }
        });
    } else {
      addRef(key, value);
    }
    
  }
}

var renderFile = Promise.denodeify(jade.renderFile);
var resolveObject = Promise.denodeify(_resolveObject);


function _result(contentType, body) {
  return {
    contentType: contentType,
    body: body
  }
}

function render(viewName, data) {
  var format = function(view) {
    return _result('text/html', view);
  };
  
  return partial(viewName, data)
    .then(format);
  
}

function partial(viewName, data) {
  var resolveData = function() {
    return resolveObject(data);
  };
  
  var compile = function(content) {
    return renderFile(`./views/${viewName}.jade`, content);
  };
  
  return resolveData(data)
    .then(compile)
}



function json(content) {
  return Promise.resolve(
    _result('application/json', JSON.stringify(content))
  );
  
}

function error(message) {
  return Promise.resolve(
    _result('text/html', message)
  );
}