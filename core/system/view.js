var jade = require('jade')
, HTTP = require('constant-list').HTTP
, Promise = require('promise')
, resolveObject = require('../helper/promise').resolveObject;

module.exports.render = render;
module.exports.json = json;
module.exports.error = error;
module.exports.partial = partial;

var renderFile = Promise.denodeify(jade.renderFile);

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