var jade = require('jade')
, HTTP = require('constant-list').HTTP
, Promise = require('promise');

module.exports.render = render;
module.exports.json = json;
module.exports.error = error;

var renderFile = Promise.denodeify(jade.renderFile)

function render(res, viewName, data, code) {
  jade.renderFile(`./views/${viewName}.jade`, data)
    .then(function(content){
      res.writeHead(HTTP.OK, {
        'Content-Type': 'text/html'
      });
      res.end(content);
    })
    .catch(function(e){
      console.error('[Error] View::render', e);
      error(res, 'Internal server error', HTTP.INTERNAL_ERROR);
    });
}

function json(res, content) {
  res.writeHead(HTTP.OK, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(content));
}

function error(res, message, code) {
  console.log('error', message, code);
  res.writeHead(code, {
    'Content-Type': 'text/html'
  });
  res.end(message);
  
}