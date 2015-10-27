const jade = require('jade')
, HTTP = require('constant-list').HTTP
, denodeify = require('promise').denodeify
, resolveObject = require('../helper/promise').resolveObject
, React = require('react')
, ReactDOMServer = require("react-dom/server");

module.exports.render = render;
module.exports.json = json;
module.exports.error = error;
module.exports.partial = partial;
module.exports.react = react;

const renderFile = denodeify(jade.renderFile);

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

function react(Component) {
  var ReactApp = React.createFactory(Component);
  return ReactDOMServer.renderToString(ReactApp());
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
