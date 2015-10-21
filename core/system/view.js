var jade = require('jade')
, HTTP = require('constant-list').HTTP
, Promise = require('promise');

module.exports.render = render;
module.exports.json = json;
module.exports.error = error;

var renderFile = Promise.denodeify(jade.renderFile)


function _result(contentType, body) {
  return {
    contentType: contentType,
    body: body
  }
}

function render(viewName, data) {
  return renderFile(`./views/${viewName}.jade`, data)
    .then(function(content){
      return _result('text/html', content);
    });
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